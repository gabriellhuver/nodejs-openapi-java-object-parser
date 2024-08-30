import java.util.List;

public class Produto {

    private int id;
    private String nome;
    private double preco;
    private boolean emEstoque;
    private Categoria categoria; // Associação com Categoria
    private List<String> tags; // Lista de Strings
    private List<Categoria> categoriasRelacionadas; // Lista de objetos Categoria

    public Produto(int id, String nome, double preco, boolean emEstoque, Categoria categoria, List<String> tags, List<Categoria> categoriasRelacionadas) {
        this.id = id;
        this.nome = nome;
        this.preco = preco;
        this.emEstoque = emEstoque;
        this.categoria = categoria;
        this.tags = tags;
        this.categoriasRelacionadas = categoriasRelacionadas;
    }

    // Getters e Setters omitidos para brevidade...
}
