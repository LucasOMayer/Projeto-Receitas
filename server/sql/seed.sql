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
    (SELECT id FROM users WHERE email = 'demo@receitasfood.com'),
    'Macarrão com tomate e manjericão',
    'Massas',
    ARRAY['macarrão', 'tomate cereja', 'manjericão', 'azeite', 'queijo ralado'],
    'Cozinhe o macarrão, refogue os tomates no azeite e finalize com manjericão fresco.',
    '25 min',
    '0 min',
    'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=900&q=80'
  ),
  (
    (SELECT id FROM users WHERE email = 'ana@receitasfood.com'),
    'Salada verde com grão-de-bico',
    'Saladas',
    ARRAY['alface', 'pepino', 'grão-de-bico', 'tomate', 'limão'],
    'Misture as folhas, legumes e grão-de-bico. Tempere com limão, azeite, sal e pimenta.',
    '15 min',
    '10 min',
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80'
  ),
  (
    (SELECT id FROM users WHERE email = 'demo@receitasfood.com'),
    'Cheesecake de morango',
    'Sobremesas',
    ARRAY['biscoito', 'cream cheese', 'morango', 'açúcar', 'creme de leite'],
    'Monte a base com biscoito, prepare o creme, leve para gelar e finalize com calda de morango.',
    '35 min',
    '3 h',
    'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=900&q=80'
  );

INSERT INTO comments (recipe_id, user_id, content)
VALUES
  (
    (SELECT id FROM recipes WHERE title = 'Macarrão com tomate e manjericão' LIMIT 1),
    (SELECT id FROM users WHERE email = 'ana@receitasfood.com'),
    'Receita simples e muito bonita para o almoço.'
  ),
  (
    (SELECT id FROM recipes WHERE title = 'Salada verde com grão-de-bico' LIMIT 1),
    (SELECT id FROM users WHERE email = 'demo@receitasfood.com'),
    'Boa opção para uma refeição leve.'
  ),
  (
    (SELECT id FROM recipes WHERE title = 'Cheesecake de morango' LIMIT 1),
    (SELECT id FROM users WHERE email = 'ana@receitasfood.com'),
    'Essa sobremesa combina muito com fim de semana.'
  );

INSERT INTO likes (recipe_id, user_id)
VALUES
  (
    (SELECT id FROM recipes WHERE title = 'Macarrão com tomate e manjericão' LIMIT 1),
    (SELECT id FROM users WHERE email = 'ana@receitasfood.com')
  ),
  (
    (SELECT id FROM recipes WHERE title = 'Salada verde com grão-de-bico' LIMIT 1),
    (SELECT id FROM users WHERE email = 'demo@receitasfood.com')
  ),
  (
    (SELECT id FROM recipes WHERE title = 'Cheesecake de morango' LIMIT 1),
    (SELECT id FROM users WHERE email = 'ana@receitasfood.com')
  )
ON CONFLICT (recipe_id, user_id) DO NOTHING;

INSERT INTO saved_recipes (recipe_id, user_id)
VALUES
  (
    (SELECT id FROM recipes WHERE title = 'Macarrão com tomate e manjericão' LIMIT 1),
    (SELECT id FROM users WHERE email = 'demo@receitasfood.com')
  ),
  (
    (SELECT id FROM recipes WHERE title = 'Cheesecake de morango' LIMIT 1),
    (SELECT id FROM users WHERE email = 'ana@receitasfood.com')
  )
ON CONFLICT (recipe_id, user_id) DO NOTHING;
