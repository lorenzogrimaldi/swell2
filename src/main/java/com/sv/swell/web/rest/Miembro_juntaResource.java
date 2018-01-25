package com.sv.swell.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.sv.swell.domain.Miembro_junta;

import com.sv.swell.repository.Miembro_juntaRepository;
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
 * REST controller for managing Miembro_junta.
 */
@RestController
@RequestMapping("/api")
public class Miembro_juntaResource {

    private final Logger log = LoggerFactory.getLogger(Miembro_juntaResource.class);

    private static final String ENTITY_NAME = "miembro_junta";

    private final Miembro_juntaRepository miembro_juntaRepository;

    public Miembro_juntaResource(Miembro_juntaRepository miembro_juntaRepository) {
        this.miembro_juntaRepository = miembro_juntaRepository;
    }

    /**
     * POST  /miembro-juntas : Create a new miembro_junta.
     *
     * @param miembro_junta the miembro_junta to create
     * @return the ResponseEntity with status 201 (Created) and with body the new miembro_junta, or with status 400 (Bad Request) if the miembro_junta has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/miembro-juntas")
    @Timed
    public ResponseEntity<Miembro_junta> createMiembro_junta(@RequestBody Miembro_junta miembro_junta) throws URISyntaxException {
        log.debug("REST request to save Miembro_junta : {}", miembro_junta);
        if (miembro_junta.getId() != null) {
            throw new BadRequestAlertException("A new miembro_junta cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Miembro_junta result = miembro_juntaRepository.save(miembro_junta);
        return ResponseEntity.created(new URI("/api/miembro-juntas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /miembro-juntas : Updates an existing miembro_junta.
     *
     * @param miembro_junta the miembro_junta to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated miembro_junta,
     * or with status 400 (Bad Request) if the miembro_junta is not valid,
     * or with status 500 (Internal Server Error) if the miembro_junta couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/miembro-juntas")
    @Timed
    public ResponseEntity<Miembro_junta> updateMiembro_junta(@RequestBody Miembro_junta miembro_junta) throws URISyntaxException {
        log.debug("REST request to update Miembro_junta : {}", miembro_junta);
        if (miembro_junta.getId() == null) {
            return createMiembro_junta(miembro_junta);
        }
        Miembro_junta result = miembro_juntaRepository.save(miembro_junta);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, miembro_junta.getId().toString()))
            .body(result);
    }

    /**
     * GET  /miembro-juntas : get all the miembro_juntas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of miembro_juntas in body
     */
    @GetMapping("/miembro-juntas")
    @Timed
    public List<Miembro_junta> getAllMiembro_juntas() {
        log.debug("REST request to get all Miembro_juntas");
        return miembro_juntaRepository.findAll();
        }

    /**
     * GET  /miembro-juntas/:id : get the "id" miembro_junta.
     *
     * @param id the id of the miembro_junta to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the miembro_junta, or with status 404 (Not Found)
     */
    @GetMapping("/miembro-juntas/{id}")
    @Timed
    public ResponseEntity<Miembro_junta> getMiembro_junta(@PathVariable Long id) {
        log.debug("REST request to get Miembro_junta : {}", id);
        Miembro_junta miembro_junta = miembro_juntaRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(miembro_junta));
    }

    /**
     * DELETE  /miembro-juntas/:id : delete the "id" miembro_junta.
     *
     * @param id the id of the miembro_junta to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/miembro-juntas/{id}")
    @Timed
    public ResponseEntity<Void> deleteMiembro_junta(@PathVariable Long id) {
        log.debug("REST request to delete Miembro_junta : {}", id);
        miembro_juntaRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
