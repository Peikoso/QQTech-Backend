export function sqlValidantion(sql) {
  // Regex para detectar comandos perigosos (case-insensitive, com bordas de palavra)
  const regexBloqueio = /\b(INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|TRUNCATE|REPLACE|GRANT|REVOKE|EXEC|EXECUTE|MERGE|CALL|LOCK|UNLOCK)\b/i;

  // Remove comentários e strings básicas para reduzir falsos positivos
  const sqlLimpo = sql
    .replace(/--.*$/gm, "")        // remove comentários de linha --
    .replace(/\/\*[\s\S]*?\*\//g, "") // remove comentários /* ... */
    .replace(/'(?:''|[^'])*'/g, "''") // remove strings simples
    .trim();

  // Testa se contém algum comando proibido
  const match = sqlLimpo.match(regexBloqueio);
  if (match) {
    return false;
  }

  return true;
}
