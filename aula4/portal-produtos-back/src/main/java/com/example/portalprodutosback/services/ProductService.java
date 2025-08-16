package com.example.portalprodutosback.services;

import com.example.portalprodutosback.dtos.ProductRequest;
import com.example.portalprodutosback.models.Product;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private static List<Product> products = List.of(
            new Product(
                    1L,
                    "Smartphone Samsung Galaxy S24 FE 128GB Grafite 5G 8GB RAM 6,7\" Câm. Tripla + Selfie 10MP",
                    "O Galaxy S24 FE Grafite 5G é o smartphone da Samsung para quem busca um aparelho com alta performance, design moderno e recursos avançados. Com tela Dynamic Amoled 2X de 6,7\", ele oferece uma experiência visual imersiva, além de contar com a câmera traseira tripla de 50MP (Wide) + 12MP (Ultra Wide) + 8MP (Telefoto) para registrar fotos e vídeos com qualidade profissional. A câmera frontal é de 10MP. É equipado com processador Samsung Exynos 2400e Deca-Core de 3.1GHz, que garante um desempenho fluido e sem travamentos, além de 8GB de memória RAM e 128GB de armazenamento interno. A bateria de 4700mAh com longa duração, permite usá-lo o dia todo sem se preocupar com a recarga. O aparelho possui proteção Corning Gorilla Victus, que garante maior resistência a quedas e arranhões. O acabamento é em alumínio. E ainda, oferece 7 Atualizações de Sistema Operacional e 7 anos de atualização de segurança, Galaxy AI (Inteligência Artificial) e Cadeado Galaxy. Atenção: Produto não acompanha fone de ouvido.",
                    2498d,
                    "Celulares e Smartphones",
                    "https://a-static.mlcdn.com.br/800x560/smartphone-samsung-galaxy-s24-fe-128gb-grafite-5g-8gb-ram-67-cam-tripla-selfie-10mp/magazineluiza/240010800/cb7f1ca382009d6cca85a254ca69a9ae.jpg"
            ),
            new Product(
                    2L,
                    "Smartphone Samsung Galaxy A56 5G Preto 128GB, 8GB RAM, Câmera Tripla até 50MP, Tela Super AMOLED 6.7\", IP67, NFC, Vídeo HDR e Recursos AI",
                    "Apresentando o Galaxy A56 5G. Com espessura de 7,4mm e peso de 198g, o Galaxy A56 5G tem boa aderência. As câmeras aprimoradas são agrupadas para corresponder ao novo design linear. O Galaxy A56 5G tem quatro opções de cores: Grafite, Cinza, Verde e Rosa.",
                    1834d,
                    "Celulares e Smartphones",
                    "https://imgs.casasbahia.com.br/55068951/1g.jpg"
            ),
            new Product(
                    3L,
                    "Smartphone Samsung Galaxy A25 6,5\" 256GB Azul Escuro 5G 8GB RAM Câm Tripla 50MP + Selfie 13MP Bateria 5000mAh Dual Chip",
                    "O Samsung Galaxy A25 na cor azul escuro é o smartphone que vai te acompanhar em todos os momentos. Com design moderno e infinita Super AMOLED de 6,5\", ele é perfeito para assistir filmes, jogar e navegar nas redes sociais. Para tirar ótimas fotos, a câmera traseira é tripla de 50MP com estabilização óptica + 8MP + 2MP que garantem fotos e vídeos de alta qualidade, enquanto a câmera frontal de 13MP, é ideal para selfies e videochamadas. Para guardar diversos arquivos, ele é equipado com 256GB de armazenamento interno e os 8GB de memória RAM, garante um desempenho rápido e eficiente, mesmo em multitarefas. Para acessar a internet de onde estiver, ele tem tecnologia 5G e é Dual Chip. Além disso, tem bateria de longa duração de 5000mAh para você ficar conectado o dia todo.",
                    1349.1,
                    "Celulares e Smartphones",
                    "https://a-static.mlcdn.com.br/800x560/smartphone-samsung-galaxy-a25-65-256gb-azul-escuro-5g-8gb-ram-cam-tripla-50mp-selfie-13mp-bateria-5000mah-dual-chip/magazineluiza/237215300/f506e35216a23119cb33d1f278f08c56.jpg"
            )
    );

    public Product create(ProductRequest request) {
        Product model = request.toModel();
        long id = products.size() + 1L;
        model.setId(id);
        products.add(model);
        return model;
    }

    public List<Product> findAll() {
        return products;
    }

    public Product findById(Long id) {
        return products.stream().filter(product -> product.getId().equals(id)).findFirst().orElse(null);
    }
}
