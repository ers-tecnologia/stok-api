echo "Iniciando o script..."

echo "Deletando pm2 0 e 1"
pm2 delete 2 3

echo "Abrindo o repositorio..."
cd /home/stok-api

echo "Clonando a banch master..."
git pull

echo "Atualizando bibliotecas"
npm i

echo "Iniciando aplicacao nodejs"
pm2 start -i max yarn --name stok-api -- dev

echo "--- FIM ---"
