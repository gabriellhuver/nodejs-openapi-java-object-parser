import example.Produto;

public class Produto {

    private int id;
    private String nome;
    private double preco;
    private boolean emEstoque;
    private Categoria categoria; // Associação com Categoria

    public Produto(int id, String nome, double preco, boolean emEstoque, Categoria categoria) {
        this.id = id;
        this.nome = nome;
        this.preco = preco;
        this.emEstoque = emEstoque;
        this.categoria = categoria;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public double getPreco() {
        return preco;
    }

    public void setPreco(double preco) {
        this.preco = preco;
    }

    public boolean isEmEstoque() {
        return emEstoque;
    }

    public void setEmEstoque(boolean emEstoque) {
        this.emEstoque = emEstoque;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public void atualizarPreco(double novoPreco) {
        this.preco = novoPreco;
    }

    public boolean verificarDisponibilidade() {
        return emEstoque;
    }
}
