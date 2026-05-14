package com.arcadia.comics.service;

import com.arcadia.comics.model.Comic;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ComicService {

    private final List<Comic> comics = new ArrayList<>();

    public ComicService() {
        // Inicializando con algunos datos de prueba
        comics.add(new Comic(UUID.randomUUID().toString(), "Batman: El Caballero de la Noche Regresa", "Frank Miller", "DC Comics", 19.99, 10));
        comics.add(new Comic(UUID.randomUUID().toString(), "Watchmen", "Alan Moore", "DC Comics", 24.99, 5));
        comics.add(new Comic(UUID.randomUUID().toString(), "Spider-Man: La Última Cacería de Kraven", "J.M. DeMatteis", "Marvel", 15.50, 8));
    }

    public List<Comic> getAllComics() {
        return comics;
    }

    public Optional<Comic> getComicById(String id) {
        return comics.stream().filter(c -> c.getId().equals(id)).findFirst();
    }

    public Comic createComic(Comic comic) {
        if (comic.getId() == null || comic.getId().isEmpty()) {
            comic.setId(UUID.randomUUID().toString());
        }
        comics.add(comic);
        return comic;
    }

    public Optional<Comic> updateComic(String id, Comic updatedComic) {
        Optional<Comic> existingComic = getComicById(id);
        existingComic.ifPresent(comic -> {
            comic.setTitulo(updatedComic.getTitulo());
            comic.setAutor(updatedComic.getAutor());
            comic.setEditorial(updatedComic.getEditorial());
            comic.setPrecio(updatedComic.getPrecio());
            comic.setStock(updatedComic.getStock());
        });
        return existingComic;
    }

    public boolean deleteComic(String id) {
        return comics.removeIf(c -> c.getId().equals(id));
    }
}
