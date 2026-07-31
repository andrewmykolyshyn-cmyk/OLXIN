-- ============================================================
-- OLXIN Seed Data
-- Run this after schema.sql in the Supabase SQL Editor
-- ============================================================

-- --------------------------------------------------------
-- 1. Ensure site_settings row exists with default categories
-- --------------------------------------------------------
insert into public.site_settings (id, name, color, fee_cents, categories)
values (
  1,
  'OLXIN',
  '#002f34',
  100,
  '[
    {"id":"motor","ic":"🚗","order":1},
    {"id":"motos","ic":"🏍","order":2},
    {"id":"inmo","ic":"🏠","order":3},
    {"id":"empleo","ic":"💼","order":4},
    {"id":"reformas","ic":"🔨","order":5},
    {"id":"electro","ic":"📺","order":6},
    {"id":"hogar","ic":"🪑","order":7},
    {"id":"moda","ic":"👗","order":8},
    {"id":"deporte","ic":"⚽","order":9},
    {"id":"bebes","ic":"🍼","order":10},
    {"id":"animales","ic":"🐕","order":11},
    {"id":"servicios","ic":"🛠","order":12},
    {"id":"coleccion","ic":"🎮","order":13},
    {"id":"agro","ic":"🌾","order":14},
    {"id":"gratis","ic":"🎁","order":15},
    {"id":"alquiler","ic":"🔑","order":16}
  ]'::jsonb
)
on conflict (id) do update set categories = excluded.categories;

-- --------------------------------------------------------
-- 2. Seed admin email allow-list
-- --------------------------------------------------------
insert into public.admins (email)
values ('andriimykolyshyn@gmail.com')
on conflict (email) do nothing;

-- Assumption: additional admins can be added via SQL or admin panel
-- The admin panel reads from this table for the allow-list

-- --------------------------------------------------------
-- 3. Seed demo profiles
-- --------------------------------------------------------
-- Note: These reference auth.users UUIDs
-- For demo purposes, we insert with random UUIDs
-- In production, profiles are auto-created on signup via trigger

-- Insert demo profiles (these will need corresponding auth.users entries
-- for full login functionality, but they serve as demo data for listings)
insert into public.profiles (id, name, is_pro, created_at)
values
  ('a0000000-0000-0000-0000-000000000001', 'Carlos Martinez', false, now() - interval '6 months'),
  ('a0000000-0000-0000-0000-000000000002', 'Reformas Blanca SL', true, now() - interval '1 year'),
  ('a0000000-0000-0000-0000-000000000003', 'Maria Lopez', false, now() - interval '3 months'),
  ('a0000000-0000-0000-0000-000000000004', 'ElectroCosta', true, now() - interval '8 months'),
  ('a0000000-0000-0000-0000-000000000005', 'Ana Garcia', false, now() - interval '1 month')
on conflict (id) do nothing;

-- --------------------------------------------------------
-- 4. Seed demo listings (active)
-- --------------------------------------------------------
-- These will appear on the homepage and search results

insert into public.listings (seller_id, cat, title, description, price, city, badge, envio, photos, views, status, payment_id, created_at)
values
  -- Motor
  ('a0000000-0000-0000-0000-000000000001', 'motor', 'Seat Leon FR 2.0 TDI 150cv', 'Vendo Seat Leon FR del 2019 en perfecto estado. 85.000 km, revisiones al dia, neumaticos nuevos. Itv pasada. Color blanco. Cambio manual 6 velocidades.', 14900, 'Alicante', 'vip', true, '{}', 342, 'active', 'pi_demo_001', now() - interval '2 days'),
  
  -- Motos
  ('a0000000-0000-0000-0000-000000000001', 'motos', 'Yamaha MT-07 2022', 'Moto en excelente estado, 12.000 km. Siempre en garaje. Revision reciente. Incluye top case.', 5500, 'Elche', 'destacado', false, '{}', 128, 'active', 'pi_demo_002', now() - interval '5 days'),
  
  -- Inmobiliaria
  ('a0000000-0000-0000-0000-000000000003', 'inmo', 'Apartamento en primera linea de playa', 'Precioso apartamento de 2 habitaciones y 1 bano en primera linea de playa de San Juan. Terraza con vistas al mar. Piscina comunitaria.', 189000, 'Alicante', 'vip', false, '{}', 567, 'active', 'pi_demo_003', now() - interval '1 day'),
  
  -- Empleo
  ('a0000000-0000-0000-0000-000000000002', 'empleo', 'Busco fontanero con experiencia', 'Empresa de reformas busca fontanero para obra en Torrevieja. Contrato temporal con posibilidad de indefinido.', 0, 'Torrevieja', '', false, '{}', 89, 'active', 'pi_demo_004', now() - interval '3 days'),
  
  -- Reformas
  ('a0000000-0000-0000-0000-000000000002', 'reformas', 'Reformas integrales - Presupuesto sin compromiso', 'Especialistas en reformas de banos, cocinas y viviendas completas. Mas de 15 anos de experiencia en la Costa Blanca. Licencia y seguro.', 0, 'Benidorm', 'vip', true, '{}', 412, 'active', 'pi_demo_005', now() - interval '12 hours'),
  
  -- Electro
  ('a0000000-0000-0000-0000-000000000004', 'electro', 'iPhone 14 Pro 256GB Morado', 'iPhone 14 Pro en color morado oscuro. 256GB. Perfecto estado, sin aranazos. Bateria al 92%. Caja y cargador originales.', 720, 'Madrid', 'destacado', true, '{}', 215, 'active', 'pi_demo_006', now() - interval '4 days'),
  
  -- Hogar
  ('a0000000-0000-0000-0000-000000000003', 'hogar', 'Sofa chaise longue 3 plazas', 'Sofa color gris con chaise longue reversible. Muy comodo, tapizado en tela antimanchas. Medidas: 240x160 cm.', 350, 'Valencia', '', true, '{}', 76, 'active', 'pi_demo_007', now() - interval '6 days'),
  
  -- Moda
  ('a0000000-0000-0000-0000-000000000005', 'moda', 'Bolso Michael Kors original', 'Bolso Michael Kors color camel, piel autentica. Poco uso. Con dust bag y tarjeta de autenticidad.', 85, 'Alicante', '', true, '{}', 43, 'active', 'pi_demo_008', now() - interval '1 week'),
  
  -- Deporte
  ('a0000000-0000-0000-0000-000000000001', 'deporte', 'Bicicleta de carrera Carbono', 'Bicicleta Orbea Orca carbono, grupo Shimano Ultegra, ruedas Vision. Talla M. Muy buen estado.', 1200, 'Murcia', 'destacado', true, '{}', 98, 'active', 'pi_demo_009', now() - interval '3 days'),
  
  -- Bebes
  ('a0000000-0000-0000-0000-000000000005', 'bebes', 'Carrito Bebecar 3 piezas', 'Conjunto de carrito Bebecar: capazo, silla y grupo 0. Color beige. Usado pero en muy buen estado. Incluye saco y paraguas.', 180, 'Sevilla', '', false, '{}', 62, 'active', 'pi_demo_010', now() - interval '5 days'),
  
  -- Animales
  ('a0000000-0000-0000-0000-000000000003', 'animales', 'Adopcion de gatitos', 'Tres gatitos de 2 meses buscan hogar. Desparasitados y con primera vacuna. Muy carinosos.', 0, 'Malaga', '', false, '{}', 154, 'active', 'pi_demo_011', now() - interval '2 days'),
  
  -- Servicios
  ('a0000000-0000-0000-0000-000000000002', 'servicios', 'Clases de espanol para extranjeros', 'Profesora nativa con experiencia da clases de espanol. Todos los niveles. Online o presencial en Alicante capital.', 15, 'Alicante', 'vip', false, '{}', 201, 'active', 'pi_demo_012', now() - interval '1 day'),
  
  -- Coleccion
  ('a0000000-0000-0000-0000-000000000001', 'coleccion', 'Coleccion de sellos Espana 1950-1980', 'Completa coleccion de sellos espanoles en albumes Lindner. Muy buen estado de conservacion. Valor catalogo +5000 eur.', 1200, 'Barcelona', '', true, '{}', 37, 'active', 'pi_demo_013', now() - interval '1 week'),
  
  -- Agro
  ('a0000000-0000-0000-0000-000000000004', 'agro', 'Tractor John Deere 5100M', 'Tractor John Deere 5100M, ano 2018, 3500 horas. Excelente estado. Revision reciente. Incluye pala frontal.', 28500, 'Valencia', 'destacado', false, '{}', 72, 'active', 'pi_demo_014', now() - interval '4 days'),
  
  -- Gratis
  ('a0000000-0000-0000-0000-000000000005', 'gratis', 'Sillas de comedor (4 unidades)', 'Regalo 4 sillas de comedor de madera. Necesitan tapizado nuevo. Recoger en Alicante capital.', 0, 'Alicante', 'free', false, '{}', 289, 'active', 'pi_demo_015', now() - interval '1 day'),
  
  -- Alquiler
  ('a0000000-0000-0000-0000-000000000003', 'alquiler', 'Alquiler habitacion en piso compartido', 'Habitacion exterior en piso compartido en centro de Alicante. 350 eur/mes gastos incluidos. Wifi, calefaccion, lavavajillas.', 350, 'Alicante', '', false, '{}', 134, 'active', 'pi_demo_016', now() - interval '3 days');

-- --------------------------------------------------------
-- 5. Seed demo ratings
-- --------------------------------------------------------
insert into public.ratings (seller_id, rater_id, stars, comment, created_at)
values
  ('a0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 5, 'Excelente trabajo en la reforma del bano. Muy profesionales.', now() - interval '2 weeks'),
  ('a0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000003', 4, 'Buen trabajo, aunque tardaron un poco mas de lo previsto.', now() - interval '1 week'),
  ('a0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000002', 5, 'Muy serio y puntual. El coche estaba tal cual describia.', now() - interval '3 days'),
  ('a0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000001', 5, 'Envio rapido y producto en perfecto estado. Vendedor recomendado.', now() - interval '5 days'),
  ('a0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000003', 4, 'Todo correcto, el telefono venia bien embalado.', now() - interval '2 days')
on conflict do nothing;
