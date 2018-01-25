package com.sv.swell.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.sv.swell.domain.Entidad;

import com.sv.swell.repository.EntidadRepository;
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
 * REST controller for managing Entidad.
 */
@RestController
@RequestMapping("/api")
public class EntidadResource {

    private final Logger log = LoggerFactory.getLogger(EntidadResource.class);

    private static final String ENTITY_NAME = "entidad";

    private final EntidadRepository entidadRepository;

    public EntidadResource(EntidadRepository entidadRepository) {
        this.entidadRepository = entidadRepository;
    }

    /**
     * POST  /entidads : Create a new entidad.
     *
     * @param entidad the entidad to create
     * @return the ResponseEntity with status 201 (Created) and with body the new entidad, or with status 400 (Bad Request) if the entidad has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/entidads")
    @Timed
    public ResponseEntity<Entidad> createEntidad(@RequestBody Entidad entidad) throws URISyntaxException {
        log.debug("REST request to save Entidad : {}", entidad);
        if (entidad.getId() != null) {
            throw new BadRequestAlertException("A new entidad cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Entidad result = entidadRepository.save(entidad);
        return ResponseEntity.created(new URI("/api/entidads/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /entidads : Updates an existing entidad.
     *
     * @param entidad the entidad to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated entidad,
     * or with status 400 (Bad Request) if the entidad is not valid,
     * or with status 500 (Internal Server Error) if the entidad couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/entidads")
    @Timed
    public ResponseEntity<Entidad> updateEntidad(@RequestBody Entidad entidad) throws URISyntaxException {
        log.debug("REST request to update Entidad : {}", entidad);
        if (entidad.getId() == null) {
            return createEntidad(entidad);
        }
        Entidad result = entidadRepository.save(entidad);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, entidad.getId().toString()))
            .body(result);
    }

    /**
     * GET  /entidads : get all the entidads.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of entidads in body
     */
    @GetMapping("/entidads")
    @Timed
    public List<Entidad> getAllEntidads() {
        log.debug("REST request to get all Entidads");
        return entidadRepository.findAll();
        }

    /**
     * GET  /entidads/:id : get the "id" entidad.
     *
     * @param id the id of the entidad to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the entidad, or with status 404 (Not Found)
     */
    @GetMapping("/entidads/{id}")
    @Timed
    public ResponseEntity<Entidad> getEntidad(@PathVariable Long id) {
        log.debug("REST request to get Entidad : {}", id);
        Entidad entidad = entidadRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(entidad));
    }

    /**
     * DELETE  /entidads/:id : delete the "id" entidad.
     *
     * @param id the id of the entidad to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/entidads/{id}")
    @Timed
    public ResponseEntity<Void> deleteEntidad(@PathVariable Long id) {
        log.debug("REST request to delete Entidad : {}", id);
        entidadRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
