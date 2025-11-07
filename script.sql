-- =============================================
-- Tabela: profiles
-- =============================================
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(10) NOT NULL,
    view_dashboard BOOLEAN DEFAULT FALSE,
    view_incidents BOOLEAN DEFAULT FALSE,
    crud_incidents BOOLEAN DEFAULT FALSE,
    view_rules BOOLEAN DEFAULT FALSE,
    crud_rules BOOLEAN DEFAULT FALSE,
    view_routes BOOLEAN DEFAULT FALSE,
    crud_routes BOOLEAN DEFAULT FALSE,
    view_roles BOOLEAN DEFAULT FALSE,
    crud_roles BOOLEAN DEFAULT FALSE,
    view_logs BOOLEAN DEFAULT FALSE,
    view_report BOOLEAN DEFAULT FALSE
);

-- =============================================
-- Tabela: users
-- =============================================
CREATE TABLE "users" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(55) NOT NULL,
    matricula VARCHAR(30) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(25),
    picture VARCHAR(255),
    profile_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    pending BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- Tabela: roles
-- =============================================
CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    color VARCHAR(20),
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- Tabela: rules
-- =============================================
CREATE TABLE rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(55) NOT NULL,
    description VARCHAR(255),
    sql TEXT NOT NULL,
    priority VARCHAR(10) NOT NULL,
    execution_interval INTEGER NOT NULL,
    max_error_count INTEGER NOT NULL,
    timeout INTEGER NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    notification_enabled BOOLEAN DEFAULT TRUE,
    is_active BOOLEAN DEFAULT TRUE,
    silence_mode BOOLEAN DEFAULT FALSE,
    postpone_date TIMESTAMP,
    user_creator_id UUID REFERENCES "user"(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- Tabela: rules_roles (N:N entre rules e roles)
-- =============================================
CREATE TABLE rules_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rule_id UUID NOT NULL REFERENCES rules(id) ON DELETE CASCADE,
    role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    UNIQUE (rule_id, role_id)
);

-- =============================================
-- Tabela: user_role (N:N entre user e roles)
-- =============================================
CREATE TABLE user_role (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    UNIQUE (user_id, role_id)
);

-- =============================================
-- Tabela: user_preferences
-- =============================================
CREATE TABLE user_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    start_time TIME,
    end_time TIME,
    push_enabled BOOLEAN DEFAULT TRUE,
    email_enabled BOOLEAN DEFAULT TRUE,
    comuniq_enabled BOOLEAN DEFAULT FALSE,
    push_sound_enabled BOOLEAN DEFAULT TRUE,
    user_id UUID REFERENCES "user"(id) ON DELETE CASCADE
);

-- =============================================
-- Tabela: incidents
-- =============================================
CREATE TABLE incidents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assigned_user_id UUID REFERENCES "user"(id) ON DELETE SET NULL,
    rule_id UUID NOT NULL REFERENCES rules(id) ON DELETE CASCADE,
    status VARCHAR(10) NOT NULL,
    ack_user_id UUID REFERENCES "user"(id) ON DELETE SET NULL,
    ack_comment VARCHAR(255),
    ack_at TIMESTAMP,
    closed_user_id UUID REFERENCES "user"(id) ON DELETE SET NULL,
    closed_comment VARCHAR(255),
    closed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- Tabela: schedule
-- =============================================
CREATE TABLE schedule (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- =============================================