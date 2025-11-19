-- ======================================
-- ROLES
-- ======================================
INSERT INTO roles (name, color, description)
VALUES
('DEV', '#FF0000', 'Desenvolvedor'),
('DBA', '#00A8FF', 'Administrador de banco de dados'),
('INFRA', '#AAAAAA', 'Responsável pela infraestrutura de TI'),
('SUPPORT', '#00FF99', 'Equipe de Suporte'),
('SRE', '#FF8800', 'Site Reliability Engineer');

-- ======================================
-- USERS
-- ======================================
INSERT INTO users (firebase_id, name, matricula, email, phone, profile, pending)
VALUES
('fb-111', 'João Martins',     '2025001', 'joao@example.com',    '75900000001', 'admin', false),
('fb-222', 'Wanessa Silva',    '2025002', 'wanessa@example.com', '75900000002', 'operator', false),
('fb-333', 'Ronaldo Tomaz',    '2025003', 'ronaldo@example.com', '75900000003', 'viewer', false),
('fb-444', 'Carlos Nogueira',  '2025004', 'carlos@example.com',  '75900000004', 'operator', false),
('fb-555', 'Patrícia Souza',   '2025005', 'patricia@example.com','75900000005', 'viewer', true);

-- ======================================
-- USER PREFERENCES
-- ======================================
INSERT INTO user_preferences (user_id, dnd_start_time, dnd_end_time, push_enabled, email_enabled, comuniq_enabled, push_sound_enabled)
SELECT id, '22:00', '07:00', true, true, false, true FROM users WHERE email='joao@example.com';

INSERT INTO user_preferences (user_id, push_enabled, email_enabled)
SELECT id, true, true FROM users WHERE email='wanessa@example.com';

INSERT INTO user_preferences (user_id, push_enabled)
SELECT id, true FROM users WHERE email='ronaldo@example.com';

INSERT INTO user_preferences (user_id, push_enabled, email_enabled, comuniq_enabled)
SELECT id, true, false, true FROM users WHERE email='carlos@example.com';

INSERT INTO user_preferences (user_id)
SELECT id FROM users WHERE email='patricia@example.com';

-- ======================================
-- USERS_ROLES
-- ======================================
INSERT INTO users_roles (user_id, role_id)
SELECT u.id, r.id FROM users u, roles r WHERE u.email='joao@example.com' AND r.name='DEV';

INSERT INTO users_roles (user_id, role_id)
SELECT u.id, r.id FROM users u, roles r WHERE u.email='wanessa@example.com' AND r.name='DBA';

INSERT INTO users_roles (user_id, role_id)
SELECT u.id, r.id FROM users u, roles r WHERE u.email='ronaldo@example.com' AND r.name='INFRA';

INSERT INTO users_roles (user_id, role_id)
SELECT u.id, r.id FROM users u, roles r WHERE u.email='carlos@example.com' AND r.name='SUPPORT';

INSERT INTO users_roles (user_id, role_id)
SELECT u.id, r.id FROM users u, roles r WHERE u.email='patricia@example.com' AND r.name='SRE';

-- ======================================
-- CHANNELS
-- ======================================
INSERT INTO channels (type, name, config)
VALUES
('PUSH', 'Firebase Cloud Messaging', '{"provider":"fcm"}'),
('EMAIL', 'SMTP Server', '{"provider":"smtp"}'),
('SMS', 'Twilio SMS', '{"provider":"twilio"}'),
('WEBHOOK', 'Webhook Delivery', '{"provider":"webhook"}');

-- ======================================
-- USER_PREFERENCES_CHANNELS
-- ======================================
-- João recebe PUSH + EMAIL
INSERT INTO user_preferences_channels (user_preferences_id, channel_id)
SELECT up.id, c.id FROM user_preferences up, channels c
WHERE up.user_id = (SELECT id FROM users WHERE email='joao@example.com')
AND c.type IN ('PUSH','EMAIL');

-- Wanessa recebe EMAIL
INSERT INTO user_preferences_channels (user_preferences_id, channel_id)
SELECT up.id, c.id FROM user_preferences up, channels c
WHERE up.user_id=(SELECT id FROM users WHERE email='wanessa@example.com')
AND c.type='EMAIL';

-- Ronaldo recebe SMS
INSERT INTO user_preferences_channels (user_preferences_id, channel_id)
SELECT up.id, c.id FROM user_preferences up, channels c
WHERE up.user_id=(SELECT id FROM users WHERE email='ronaldo@example.com')
AND c.type='SMS';

-- ======================================
-- RULES
-- ======================================
-- regra principal
INSERT INTO rules (name, description, database_type, sql, priority, execution_interval_ms,
    max_error_count, timeout_ms, start_time, end_time,
    notification_enabled, user_creator_id)
SELECT
    'Regra de Teste',
    'Regra que verifica erros no sistema',
    'POSTGRESQL',
    'SELECT 1 WHERE random() > 0.7;',
    'HIGH',
    60000, 5, 5000, '00:00', '23:59', true, u.id
FROM users u WHERE u.email='joao@example.com';

-- regra adicional
INSERT INTO rules (name, description, database_type, sql, priority, execution_interval_ms,
    max_error_count, timeout_ms, start_time, end_time,
    notification_enabled, user_creator_id)
SELECT
    'Monitoramento de Latência',
    'Verifica spikes acima de 200ms',
    'ORACLE',
    'SELECT avg(latencia) FROM sistema.logs WHERE latencia > 200;',
    'MEDIUM',
    300000, 3, 8000, '06:00', '23:00', true, u.id
FROM users u WHERE u.email='wanessa@example.com';

-- ======================================
-- RULES_ROLES
-- ======================================
INSERT INTO rules_roles (rule_id, role_id)
SELECT r.id, ro.id
FROM rules r, roles ro
WHERE r.name='Regra de Teste' AND ro.name='DBA';

INSERT INTO rules_roles (rule_id, role_id)
SELECT r.id, ro.id
FROM rules r, roles ro
WHERE r.name='Monitoramento de Latência' AND ro.name='SRE';

-- ======================================
-- INCIDENTS
-- ======================================
INSERT INTO incidents (assigned_user_id, rule_id, status, priority)
SELECT u.id, r.id, 'OPEN', 'HIGH'
FROM users u, rules r
WHERE u.email='wanessa@example.com' AND r.name='Regra de Teste';

INSERT INTO incidents (assigned_user_id, rule_id, status, priority)
SELECT u.id, r.id, 'OPEN', 'MEDIUM'
FROM users u, rules r
WHERE u.email='carlos@example.com' AND r.name='Monitoramento de Latência';

-- ======================================
-- INCIDENT EVENTS
-- ======================================
INSERT INTO incidents_events (incident_id, previous_status, current_status, comment, action_user_id)
SELECT i.id, 'OPEN', 'ACK', 'Incidente reconhecido', u.id
FROM incidents i, users u
WHERE u.email='wanessa@example.com'
ORDER BY i.created_at LIMIT 1;

-- ======================================
-- SCHEDULES
-- ======================================
INSERT INTO schedules (user_id, start_time, end_time)
SELECT id, now(), now() + INTERVAL '8 hours'
FROM users WHERE email='wanessa@example.com';

INSERT INTO schedules (user_id, start_time, end_time)
SELECT id, now(), now() + INTERVAL '12 hours'
FROM users WHERE email='carlos@example.com';

-- ======================================
-- RUNNERS
-- ======================================
INSERT INTO runners (rule_id, status, last_run_at, next_run_at)
SELECT id, 'active', now() - INTERVAL '30 min', now() + INTERVAL '10 min'
FROM rules
WHERE name='Regra de Teste';

INSERT INTO runners (rule_id, status, last_run_at, next_run_at)
SELECT id, 'active', now() - INTERVAL '5 min', now() + INTERVAL '2 min'
FROM rules
WHERE name='Monitoramento de Latência';

-- ======================================
-- RUNNER_QUEUE
-- ======================================
INSERT INTO runner_queue (runner_id, status, scheduled_for)
SELECT id, 'PENDING', now() + INTERVAL '1 min'
FROM runners LIMIT 2;

-- ======================================
-- RUNNER_LOGS
-- ======================================
INSERT INTO runner_logs (runner_id, queue_id, run_time_ms, execution_status, rows_affected, result)
SELECT r.id, q.id, 1500, 'SUCCESS', 10, 'Execução ok'
FROM runners r, runner_queue q
LIMIT 1;

INSERT INTO runner_logs (runner_id, queue_id, run_time_ms, execution_status, error)
SELECT r.id, q.id, 2200, 'TIMEOUT', 'Tempo excedido'
FROM runners r, runner_queue q
OFFSET 1 LIMIT 1;

-- ======================================
-- NOTIFICATIONS
-- ======================================
INSERT INTO notifications (incident_id, channel_id, user_id, title, message, duration_ms)
SELECT i.id, c.id, u.id, 'Novo Incidente', 'Há um incidente aberto.', 4000
FROM incidents i, channels c, users u
WHERE c.type='PUSH' AND u.email='wanessa@example.com'
LIMIT 1;

-- ======================================
-- SQL TEST LOGS
-- ======================================
INSERT INTO sql_test_logs (user_id, sql, result)
SELECT id, 'SELECT 1;', 'OK'
FROM users WHERE email='joao@example.com';

-- ======================================
-- ESCALATION_POLICIES
-- ======================================
INSERT INTO escalation_policy (timeout_ms, role_id)
SELECT 300000, id FROM roles WHERE name='DBA';

INSERT INTO escalation_policy (timeout_ms, role_id)
SELECT 180000, id FROM roles WHERE name='SRE';

-- ======================================
-- APP SETTINGS
-- ======================================
INSERT INTO app_settings (key, value)
VALUES
('system.theme', '{"color":"dark"}'),
('notifications.retry_limit', '{"value":5}'),
('scheduler.enabled', '{"value":true}');
