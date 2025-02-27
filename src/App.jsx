import axios from 'axios';
import { useEffect, useState } from 'react'


function App() {
  const [transactios, setTransactios] = useState([]);
  const [file, setFile] = useState(null);
  
  const fetchTransactions = async () =>{
    const response = await axios.get(import.meta.env.VITE_FETCH_URL);
    setTransactios(response.data);
    console.log(response.data);
  }

  const handleFileChange = (e) => {
      setFile(e.target.files[0]);
  }

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append('file', file);
    axios.post(import.meta.env.VITE_UPLOAD_URL, formData, {
      Headers:{
        'Content-Type': 'multipart/form-data'
      }
    });
  }
  useEffect(() =>{
    fetchTransactions();
  },[])

  return (
    <div className="p-4 bg-gray-50 min-h-screen">

  {/* Título */}
  <h1 className="text-2xl font-semibold mb-4 text-gray-800">Importação de CNAB</h1>

  {/* Upload de Arquivo */}
  <div className="mb-8">
    <label className="flex items-center space-x-2">
      <span className="px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition-colors">
        Escolher Arquivo
      </span>
      <input
        type="file"
        accept=".txt"
        onChange={handleFileChange}
        className="hidden"
      />
    </label>
    <button
      className="ml-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
      onClick={uploadFile}
    >
      Upload File
    </button>
  </div>

  {/* Lista de Transações */}
  <div>
    <h2 className="text-xl font-semibold mb-4 text-gray-800">Transações</h2>
    <ul>
      {transactios.map((report, key) => (
        <li key={key} className="mb-6">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left text-gray-700">Cartão</th>
                <th className="px-4 py-2 text-left text-gray-700">CPF</th>
                <th className="px-4 py-2 text-left text-gray-700">Data</th>
                <th className="px-4 py-2 text-left text-gray-700">Dono da Loja</th>
                <th className="px-4 py-2 text-left text-gray-700">Hora</th>
                <th className="px-4 py-2 text-left text-gray-700">Nome da Loja</th>
                <th className="px-4 py-2 text-left text-gray-700">Tipo</th>
                <th className="px-4 py-2 text-left text-gray-700">Valor</th>
              </tr>
            </thead>
            <tbody>
              {report.transacoes.map((transacao, key) => (
                <tr key={key} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-2 text-gray-700">{transacao.cartao}</td>
                  <td className="px-4 py-2 text-gray-700">{transacao.cpf}</td>
                  <td className="px-4 py-2 text-gray-700">{transacao.data}</td>
                  <td className="px-4 py-2 text-gray-700">{transacao.donoDaLoja}</td>
                  <td className="px-4 py-2 text-gray-700">{transacao.hora}</td>
                  <td className="px-4 py-2 text-gray-700">{transacao.nomeDaLoja}</td>
                  <td className="px-4 py-2 text-gray-700">{transacao.tipo}</td>
                  <td className="px-4 py-2 text-gray-700">{transacao.valor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </li>
      ))}
    </ul>
  </div>
</div>
    )
}

export default App
