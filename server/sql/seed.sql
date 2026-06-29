INSERT INTO users (name, username, email, password_hash, bio, avatar_url)
VALUES
  (
    'Usuário Demonstração',
    'demo_food',
    'demo@receitasfood.com',
    '123456',
    'Perfil acadêmico para testar login e publicações.',
    ''
  ),
  (
    'Ana Costa',
    'ana_cozinha',
    'ana@receitasfood.com',
    '123456',
    'Apaixonada por saladas, massas e receitas rápidas.',
    ''
  )
ON CONFLICT (email) DO NOTHING;

INSERT INTO recipes (
  user_id,
  title,
  category,
  ingredients,
  preparation,
  preparation_time,
  waiting_time,
  image_url
)
VALUES
  (
    1,
    'Macarrão com tomate e manjericão',
    'Massas',
    ARRAY['macarrão', 'tomate cereja', 'manjericão', 'azeite', 'queijo ralado'],
    'Cozinhe o macarrão, refogue os tomates no azeite e finalize com manjericão fresco.',
    '25 min',
    '0 min',
    'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=900&q=80'
  ),
  (
    2,
    'Salada verde com grão-de-bico',
    'Saladas',
    ARRAY['alface', 'pepino', 'grão-de-bico', 'tomate', 'limão'],
    'Misture as folhas, legumes e grão-de-bico. Tempere com limão, azeite, sal e pimenta.',
    '15 min',
    '10 min',
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80'
  );
