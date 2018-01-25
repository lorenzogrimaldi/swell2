package com.sv.swell.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.sv.swell.domain.Entrenador;

import com.sv.swell.repository.EntrenadorRepository;
import com.sv.swell.web.rest.errors.BadRequestAlertException;
import com.sv.swell.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Entrenador.
 */
@RestController
@RequestMapping("/api")
public class EntrenadorResource {

    private final Logger log = LoggerFactory.getLogger(EntrenadorResource.class);

    private static final String ENTITY_NAME = "entrenador";

    private final EntrenadorRepository entrenadorRepository;

    public EntrenadorResource(EntrenadorRepository entrenadorRepository) {
        this.entrenadorRepository = entrenadorRepository;
    }

    /**
     * POST  /entrenadors : Create a new entrenador.
     *
     * @param entrenador the entrenador to create
     * @return the ResponseEntity with status 201 (Created) and with body the new entrenador, or with status 400 (Bad Request) if the entrenador has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/entrenadors")
    @Timed
    public ResponseEntity<Entrenador> createEntrenador(@RequestBody Entrenador entrenador) throws URISyntaxException {
        log.debug("REST request to save Entrenador : {}", entrenador);
        if (entrenador.getId() != null) {
            throw new BadRequestAlertException("A new entrenador cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Entrenador result = entrenadorRepository.save(entrenador);
        return ResponseEntity.created(new URI("/api/entrenadors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /entrenadors : Updates an existing entrenador.
     *
     * @param entrenador the entrenador to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated entrenador,
     * or with status 400 (Bad Request) if the entrenador is not valid,
     * or with status 500 (Internal Server Error) if the entrenador couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/entrenadors")
    @Timed
    public ResponseEntity<Entrenador> updateEntrenador(@RequestBody Entrenador entrenador) throws URISyntaxException {
        log.debug("REST request to update Entrenador : {}", entrenador);
        if (entrenador.getId() == null) {
            return createEntrenador(entrenador);
        }
        Entrenador result = entrenadorRepository.save(entrenador);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, entrenador.getId().toString()))
            .body(result);
    }

    /**
     * GET  /entrenadors : get all the entrenadors.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of entrenadors in body
     */
    @GetMapping("/entrenadors")
    @Timed
    public List<Entrenador> getAllEntrenadors() {
        log.debug("REST request to get all Entrenadors");
        return entrenadorRepository.findAll();
        }

    /**
     * GET  /entrenadors/:id : get the "id" entrenador.
     *
     * @param id the id of the entrenador to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the entrenador, or with status 404 (Not Found)
     */
    @GetMapping("/entrenadors/{id}")
    @Timed
    public ResponseEntity<Entrenador> getEntrenador(@PathVariable Long id) {
        log.debug("REST request to get Entrenador : {}", id);
        Entrenador entrenador = entrenadorRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(entrenador));
    }

    /**
     * DELETE  /entrenadors/:id : delete the "id" entrenador.
     *
     * @param id the id of the entrenador to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/entrenadors/{id}")
    @Timed
    public ResponseEntity<Void> deleteEntrenador(@PathVariable Long id) {
        log.debug("REST request to delete Entrenador : {}", id);
        entrenadorRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
