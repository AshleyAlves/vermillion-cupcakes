CREATE TABLE produtos(
	id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(200),
    descricao TEXT,
    preco DECIMAL(10,2),
    imagem VARCHAR(255),
    id_categoria INT,
    FOREIGN KEY (id_categoria) REFERENCES categorias(id)
);
CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50),
    valor_total DECIMAL(10, 2),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);
CREATE TABLE itens_pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT,
    id_produto INT,
    quantidade INT,
    preco DECIMAL(10, 2),
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id),
    FOREIGN KEY (id_produto) REFERENCES produtos(id)
);
CREATE TABLE carrinho (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    id_produto INT,
    quantidade INT,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
    FOREIGN KEY (id_produto) REFERENCES produtos(id)
);

