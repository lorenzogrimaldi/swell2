package com.sv.swell.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.sv.swell.domain.Escuela;

import com.sv.swell.repository.EscuelaRepository;
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
 * REST controller for managing Escuela.
 */
@RestController
@RequestMapping("/api")
public class EscuelaResource {

    private final Logger log = LoggerFactory.getLogger(EscuelaResource.class);

    private static final String ENTITY_NAME = "escuela";

    private final EscuelaRepository escuelaRepository;

    public EscuelaResource(EscuelaRepository escuelaRepository) {
        this.escuelaRepository = escuelaRepository;
    }

    /**
     * POST  /escuelas : Create a new escuela.
     *
     * @param escuela the escuela to create
     * @return the ResponseEntity with status 201 (Created) and with body the new escuela, or with status 400 (Bad Request) if the escuela has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/escuelas")
    @Timed
    public ResponseEntity<Escuela> createEscuela(@RequestBody Escuela escuela) throws URISyntaxException {
        log.debug("REST request to save Escuela : {}", escuela);
        if (escuela.getId() != null) {
            throw new BadRequestAlertException("A new escuela cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Escuela result = escuelaRepository.save(escuela);
        return ResponseEntity.created(new URI("/api/escuelas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /escuelas : Updates an existing escuela.
     *
     * @param escuela the escuela to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated escuela,
     * or with status 400 (Bad Request) if the escuela is not valid,
     * or with status 500 (Internal Server Error) if the escuela couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/escuelas")
    @Timed
    public ResponseEntity<Escuela> updateEscuela(@RequestBody Escuela escuela) throws URISyntaxException {
        log.debug("REST request to update Escuela : {}", escuela);
        if (escuela.getId() == null) {
            return createEscuela(escuela);
        }
        Escuela result = escuelaRepository.save(escuela);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, escuela.getId().toString()))
            .body(result);
    }

    /**
     * GET  /escuelas : get all the escuelas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of escuelas in body
     */
    @GetMapping("/escuelas")
    @Timed
    public List<Escuela> getAllEscuelas() {
        log.debug("REST request to get all Escuelas");
        return escuelaRepository.findAll();
        }

    /**
     * GET  /escuelas/:id : get the "id" escuela.
     *
     * @param id the id of the escuela to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the escuela, or with status 404 (Not Found)
     */
    @GetMapping("/escuelas/{id}")
    @Timed
    public ResponseEntity<Escuela> getEscuela(@PathVariable Long id) {
        log.debug("REST request to get Escuela : {}", id);
        Escuela escuela = escuelaRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(escuela));
    }

    /**
     * DELETE  /escuelas/:id : delete the "id" escuela.
     *
     * @param id the id of the escuela to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/escuelas/{id}")
    @Timed
    public ResponseEntity<Void> deleteEscuela(@PathVariable Long id) {
        log.debug("REST request to delete Escuela : {}", id);
        escuelaRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
