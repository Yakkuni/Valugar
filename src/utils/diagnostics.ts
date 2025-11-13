// Script para testar a conexão com o backend
// Execute este arquivo no console do navegador para diagnosticar problemas

console.log('🔍 Iniciando diagnóstico de conexão...\n');

// 1. Verificar variáveis de ambiente
console.log('1️⃣ Verificando variáveis de ambiente:');
console.log('   VITE_API_URL:', import.meta.env.VITE_API_URL || 'não definido');
console.log('');

// 2. Verificar localStorage
console.log('2️⃣ Verificando tokens no localStorage:');
const accessToken = localStorage.getItem('accessToken');
const refreshToken = localStorage.getItem('refreshToken');
console.log('   accessToken:', accessToken ? '✅ Existe' : '❌ Não encontrado');
console.log('   refreshToken:', refreshToken ? '✅ Existe' : '❌ Não encontrado');
console.log('');

// 3. Testar conexão com o backend
console.log('3️⃣ Testando conexão com o backend...');

const testUrls = [
  'http://localhost:3000',
  '/api',
];

async function testConnection(url: string) {
  try {
    const response = await fetch(url);
    console.log(`   ✅ ${url} → Status: ${response.status}`);
    return true;
  } catch (error: any) {
    console.log(`   ❌ ${url} → Erro: ${error.message}`);
    return false;
  }
}

(async () => {
  for (const url of testUrls) {
    await testConnection(url);
  }
  
  console.log('');
  console.log('4️⃣ Recomendações:');
  console.log('   • Certifique-se de que o backend está rodando na porta 3000');
  console.log('   • Reinicie o servidor frontend após alterar .env ou vite.config.ts');
  console.log('   • Verifique o arquivo TROUBLESHOOTING.md para mais detalhes');
})();

export {};
