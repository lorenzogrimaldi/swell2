package com.sv.swell.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.sv.swell.domain.Juez;

import com.sv.swell.repository.JuezRepository;
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
 * REST controller for managing Juez.
 */
@RestController
@RequestMapping("/api")
public class JuezResource {

    private final Logger log = LoggerFactory.getLogger(JuezResource.class);

    private static final String ENTITY_NAME = "juez";

    private final JuezRepository juezRepository;

    public JuezResource(JuezRepository juezRepository) {
        this.juezRepository = juezRepository;
    }

    /**
     * POST  /juezs : Create a new juez.
     *
     * @param juez the juez to create
     * @return the ResponseEntity with status 201 (Created) and with body the new juez, or with status 400 (Bad Request) if the juez has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/juezs")
    @Timed
    public ResponseEntity<Juez> createJuez(@RequestBody Juez juez) throws URISyntaxException {
        log.debug("REST request to save Juez : {}", juez);
        if (juez.getId() != null) {
            throw new BadRequestAlertException("A new juez cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Juez result = juezRepository.save(juez);
        return ResponseEntity.created(new URI("/api/juezs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /juezs : Updates an existing juez.
     *
     * @param juez the juez to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated juez,
     * or with status 400 (Bad Request) if the juez is not valid,
     * or with status 500 (Internal Server Error) if the juez couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/juezs")
    @Timed
    public ResponseEntity<Juez> updateJuez(@RequestBody Juez juez) throws URISyntaxException {
        log.debug("REST request to update Juez : {}", juez);
        if (juez.getId() == null) {
            return createJuez(juez);
        }
        Juez result = juezRepository.save(juez);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, juez.getId().toString()))
            .body(result);
    }

    /**
     * GET  /juezs : get all the juezs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of juezs in body
     */
    @GetMapping("/juezs")
    @Timed
    public List<Juez> getAllJuezs() {
        log.debug("REST request to get all Juezs");
        return juezRepository.findAll();
        }

    /**
     * GET  /juezs/:id : get the "id" juez.
     *
     * @param id the id of the juez to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the juez, or with status 404 (Not Found)
     */
    @GetMapping("/juezs/{id}")
    @Timed
    public ResponseEntity<Juez> getJuez(@PathVariable Long id) {
        log.debug("REST request to get Juez : {}", id);
        Juez juez = juezRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(juez));
    }

    /**
     * DELETE  /juezs/:id : delete the "id" juez.
     *
     * @param id the id of the juez to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/juezs/{id}")
    @Timed
    public ResponseEntity<Void> deleteJuez(@PathVariable Long id) {
        log.debug("REST request to delete Juez : {}", id);
        juezRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
