package com.monster.luv_cocktail.domain.controller;

import com.monster.luv_cocktail.domain.entity.Cocktail;
import com.monster.luv_cocktail.domain.entity.ViewLog;
import com.monster.luv_cocktail.domain.repository.CocktailsRepository;
import com.monster.luv_cocktail.domain.repository.ViewRepository;
import com.monster.luv_cocktail.domain.service.ViewService;
import java.time.ZonedDateTime;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(
        origins = {"https://localhost:5174"}
)
@RequestMapping({"/view"})
@RestController
public class ViewController {
    private final ViewService viewService;
    private final CocktailsRepository cocktailsRepository;
    private final ViewRepository viewRepository;
    private final ExecutorService executorService = Executors.newFixedThreadPool(10);

    public ViewController(ViewService viewService, CocktailsRepository cocktailsRepository, ViewRepository viewRepository) {
        this.viewService = viewService;
        this.cocktailsRepository = cocktailsRepository;
        this.viewRepository = viewRepository;
    }

    @PutMapping({"/api/cocktails/{id}"})
    public ResponseEntity<Void> updateCocktailViews(@PathVariable Long id, @RequestBody Map<String, String> request) {
        String timestamp = request.get("timestamp");
        Cocktail cocktail = this.cocktailsRepository.findById(id).orElseThrow(() -> {
            return new RuntimeException("Cocktail not found");
        });
        this.executorService.submit(() -> {
            ViewLog view = new ViewLog();
            view.setCocktail(cocktail);
            view.setViewDate(ZonedDateTime.parse(timestamp));
            this.viewRepository.save(view);
        });
        return ResponseEntity.ok().build();
    }
}
