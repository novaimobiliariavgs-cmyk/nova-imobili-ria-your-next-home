
-- Insere o usuário admin diretamente no auth.users com email confirmado
DO $$
DECLARE
  new_user_id uuid := gen_random_uuid();
BEGIN
  -- Só cria se ainda não existir
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'novaimobiliariavgs@gmail.com') THEN
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      recovery_sent_at,
      last_sign_in_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      confirmation_token,
      email_change,
      email_change_token_new,
      recovery_token
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      new_user_id,
      'authenticated',
      'authenticated',
      'novaimobiliariavgs@gmail.com',
      crypt('Nova@2026', gen_salt('bf')),
      now(),
      now(),
      now(),
      '{"provider":"email","providers":["email"]}',
      '{}',
      now(),
      now(),
      '',
      '',
      '',
      ''
    );

    INSERT INTO auth.identities (
      id,
      user_id,
      provider_id,
      identity_data,
      provider,
      last_sign_in_at,
      created_at,
      updated_at
    ) VALUES (
      gen_random_uuid(),
      new_user_id,
      new_user_id::text,
      format('{"sub":"%s","email":"%s"}', new_user_id, 'novaimobiliariavgs@gmail.com')::jsonb,
      'email',
      now(),
      now(),
      now()
    );
  ELSE
    -- Se existir, apenas atualiza a senha e confirma o email
    UPDATE auth.users
    SET
      encrypted_password = crypt('Nova@2026', gen_salt('bf')),
      email_confirmed_at = COALESCE(email_confirmed_at, now()),
      updated_at = now()
    WHERE email = 'novaimobiliariavgs@gmail.com';
  END IF;
END $$;
