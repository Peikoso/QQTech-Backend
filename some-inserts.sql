-- ===============================
-- ROLES
-- ===============================
INSERT INTO roles (name, color, description)
VALUES
('ADMIN', '#FF0000', 'Administrador do sistema'),
('OPERATOR', '#00A8FF', 'Operador responsável por incidentes'),
('VIEWER', '#AAAAAA', 'Usuário com permissões de leitura');

-- ===============================
-- USERS
-- ===============================
INSERT INTO users (firebase_id, name, matricula, email, phone, profile, pending)
VALUES
('fb-111', 'João Martins',  '2025001', 'joao@example.com', '75900000001', 'admin', false),
('fb-222', 'Wanessa Silva',   '2025002', 'wanessa@example.com', '75900000002', 'operator', false),
('fb-333', 'Ronaldo Tomaz',    '2025003', 'ronaldo@example.com', '75900000003', 'viewer', false);

-- ===============================
-- USER PREFERENCES
-- ===============================
INSERT INTO user_preferences (user_id, dnd_start_time, dnd_end_time, push_enabled, email_enabled, comuniq_enabled, push_sound_enabled)
SELECT id, '22:00', '07:00', true, true, false, true FROM users WHERE email='joao@example.com';

INSERT INTO user_preferences (user_id, push_enabled, email_enabled)
SELECT id, true, true FROM users WHERE email='wanessa@example.com';

INSERT INTO user_preferences (user_id, push_enabled)
SELECT id, true FROM users WHERE email='ronaldo@example.com';

-- ===============================
-- USERS_ROLES
-- ===============================
INSERT INTO users_roles (user_id, role_id)
SELECT u.id, r.id FROM users u, roles r
WHERE u.email = 'joao@example.com'  AND r.name = 'ADMIN';

INSERT INTO users_roles (user_id, role_id)
SELECT u.id, r.id FROM users u, roles r
WHERE u.email = 'wanessa@example.com' AND r.name = 'OPERATOR';

INSERT INTO users_roles (user_id, role_id)
SELECT u.id, r.id FROM users u, roles r
WHERE u.email = 'ronaldo@example.com' AND r.name = 'VIEWER';

-- ===============================
-- RULES
-- ===============================
INSERT INTO rules (
    name, description, sql, priority, execution_interval_ms,
    max_error_count, timeout_ms, start_time, end_time,
    notification_enabled, user_creator_id
)
SELECT
    'Regra de Teste',
    'Regra que verifica erros no sistema',
    'SELECT 1 WHERE random() > 0.7;',
    'HIGH',
    60000,
    5,
    5000,
    '00:00',
    '23:59',
    true,
    u.id
FROM users u
WHERE u.email='joao@example.com';

-- ===============================
-- RULES_ROLES
-- ===============================
INSERT INTO rules_roles (rule_id, role_id)
SELECT r1.id, r2.id FROM rules r1, roles r2 WHERE r1.name='Regra de Teste' AND r2.name='OPERATOR';

-- ===============================
-- INCIDENTS
-- ===============================
INSERT INTO incidents (assigned_user_id, rule_id, status, priority)
SELECT u.id, rl.id, 'OPEN', 'HIGH'
FROM users u, rules rl
WHERE u.email='wanessa@example.com'
AND rl.name='Regra de Teste';

-- ===============================
-- CHANNELS
-- ===============================
INSERT INTO channels (type, name, config)
VALUES
('PUSH', 'Firebase Cloud Messaging', '{"provider":"fcm"}'),
('EMAIL', 'SMTP Server', '{"provider":"smtp"}'),
('SMS', 'Twilio SMS', '{"provider":"twilio"}');

-- ===============================
-- SCHEDULES
-- ===============================
INSERT INTO schedules (user_id, start_time, end_time)
SELECT id, now(), now() + INTERVAL '8 hours' FROM users WHERE email='wanessa@example.com';

-- ===============================
-- SCHEDULES_CHANNELS
-- ===============================
INSERT INTO schedules_channels (schedule_id, channel_id)
SELECT s.id, c.id
FROM schedules s, channels c
WHERE c.type='PUSH'
LIMIT 1;

-- ===============================
-- INCIDENT EVENTS
-- ===============================
INSERT INTO incidents_events (incident_id, previous_status, current_status, comment, action_user_id)
SELECT i.id, 'OPEN', 'ACK', 'Operador reconheceu o incidente', u.id
FROM incidents i, users u
WHERE u.email='wanessa@example.com'
ORDER BY i.created_at
LIMIT 1;

-- ===============================
-- NOTIFICATIONS
-- ===============================
INSERT INTO notifications (incident_id, channel_id, user_id, title, message, duration_ms)
SELECT i.id, c.id, u.id,
       'Novo Incidente', 'Você possui um incidente pendente.', 5000
FROM incidents i, channels c, users u
WHERE c.type='PUSH' AND u.email='wanessa@example.com'
LIMIT 1;

-- ===============================
-- SQL TEST LOGS
-- ===============================
INSERT INTO sql_test_logs (user_id, sql, result)
SELECT id, 'SELECT 1;', 'OK' FROM users WHERE email='joao@example.com';

-- ===============================
-- ESCALATION POLICY
-- ===============================
INSERT INTO escalation_policy (timeout_ms, role_id)
SELECT 300000, id FROM roles WHERE name='OPERATOR';

-- ===============================
-- APP SETTINGS
-- ===============================
INSERT INTO app_settings (key, value)
VALUES
('system.theme', '{"color":"dark"}'),
('notifications.retry_limit', '{"value":5}');
