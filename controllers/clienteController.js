var clientes = [];

//Método POST
exports.inserirCliente = (req, res) => {
    const { nome, idade, cidade, pedidos } = req.body;

    const id = clientes.length + 1;

    if (nome && idade && cidade) {
        clientes.push({
            id, nome, idade, cidade, pedidos
        });

        res.status(201).json({ mensagem: 'Cliente cadastrado com sucesso!;' });
    }

    else {
        res.status(401).json({ mensagem: 'Algum dos dados inseridos está vázio.;' });
    }
}

exports.adicionarPedido = (req, res) => {
    const id = parseInt(req.params.id);
    const cliente = clientes.find(u => u.id === id);

    const { codigo, produto, quantidade } = req.body;

    if (cliente) {

        cliente.pedidos.push({
            codigo, produto, quantidade
        });

        res.status(200).json({ mensagem: 'Pedido cadastrado com sucesso!' });

    } else {
        res.status(400).json({ mensagem: 'ID não existente' });
    }
}


//Método GET
exports.listarClientes = (req, res) => {
    res.json(clientes);
}

exports.buscarPorID = (req, res) => {
    const id = parseInt(req.params.id);
    const cliente = clientes.find(u => u.id === id);
    if (cliente) {
        res.json(cliente);
    } else {
        res.status(400).json({ mensagem: 'ID não existente' });
    }
}

exports.listarPedidos = (req, res) => {
    const id = parseInt(req.params.id);
    const cliente = clientes.find(u => u.id === id);

    if (cliente) {

        res.json(cliente.pedidos);

    } else {
        res.status(400).json({ mensagem: 'ID não existente' });
    }
}

exports.buscarPorCidade = (req, res) => {
    const cidade = req.params.cidade;
    const cliente = clientes.filter(u => u.cidade === cidade);
    if (cliente) {
        res.json(cliente);
    } else {
        res.status(400).json({ mensagem: 'Cidade não existente' });
    }
}



//Método PUT

exports.atualizarCliente = (req, res) => {
    const id = parseInt(req.params.id);
    const cliente = clientes.find(u => u.id === id);

    if (cliente) {
        const { nome, idade, cidade } = req.body;

        cliente.nome = nome;
        cliente.idade = idade;
        cliente.cidade = cidade;

        res.status(202).json({ mensagem: 'Cliente atualizado com sucesso!' })
    }

    else {
        res.status(404).json({ mensagem: 'ID não existente.' })
    }
}


//Método DELETE

exports.apagarCliente = (req, res) => {
    const id = parseInt(req.params.id);
    const indice = clientes.findIndex(u => u.id === id);

    if (indice !== -1) {
        const clienteRemovido = clientes.splice(indice, 1);

        res.json({
            mensagem: 'Cliente removido com sucesso!',
            cliente: clienteRemovido[0]
        });
    } else {
        res.status(404).json({
            mensagem: 'ID não existente'
        });
    }
};