const express = require('express');
const clienteController = require('../controllers/clienteController');

const router = express.Router();

//POST
router.post('/', clienteController.inserirCliente);
router.post('/:id/pedidos', clienteController.adicionarPedido);


//GET
router.get('/', clienteController.listarClientes);
router.get('/:id', clienteController.buscarPorID);
router.get('/:id/pedidos', clienteController.listarPedidos);
router.get('/cidade/:cidade', clienteController.buscarPorCidade);

//PUT
router.put('/:id', clienteController.atualizarCliente);

//DELETE
router.delete('/:id', clienteController.apagarCliente);


module.exports = router;