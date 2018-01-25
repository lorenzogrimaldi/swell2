package com.sv.swell.web.rest;

import com.sv.swell.Swell2App;

import com.sv.swell.domain.Escuela;
import com.sv.swell.repository.EscuelaRepository;
import com.sv.swell.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.sv.swell.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the EscuelaResource REST controller.
 *
 * @see EscuelaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Swell2App.class)
public class EscuelaResourceIntTest {

    private static final Instant DEFAULT_FUNDACION = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FUNDACION = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private EscuelaRepository escuelaRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEscuelaMockMvc;

    private Escuela escuela;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EscuelaResource escuelaResource = new EscuelaResource(escuelaRepository);
        this.restEscuelaMockMvc = MockMvcBuilders.standaloneSetup(escuelaResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Escuela createEntity(EntityManager em) {
        Escuela escuela = new Escuela()
            .fundacion(DEFAULT_FUNDACION);
        return escuela;
    }

    @Before
    public void initTest() {
        escuela = createEntity(em);
    }

    @Test
    @Transactional
    public void createEscuela() throws Exception {
        int databaseSizeBeforeCreate = escuelaRepository.findAll().size();

        // Create the Escuela
        restEscuelaMockMvc.perform(post("/api/escuelas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(escuela)))
            .andExpect(status().isCreated());

        // Validate the Escuela in the database
        List<Escuela> escuelaList = escuelaRepository.findAll();
        assertThat(escuelaList).hasSize(databaseSizeBeforeCreate + 1);
        Escuela testEscuela = escuelaList.get(escuelaList.size() - 1);
        assertThat(testEscuela.getFundacion()).isEqualTo(DEFAULT_FUNDACION);
    }

    @Test
    @Transactional
    public void createEscuelaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = escuelaRepository.findAll().size();

        // Create the Escuela with an existing ID
        escuela.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEscuelaMockMvc.perform(post("/api/escuelas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(escuela)))
            .andExpect(status().isBadRequest());

        // Validate the Escuela in the database
        List<Escuela> escuelaList = escuelaRepository.findAll();
        assertThat(escuelaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllEscuelas() throws Exception {
        // Initialize the database
        escuelaRepository.saveAndFlush(escuela);

        // Get all the escuelaList
        restEscuelaMockMvc.perform(get("/api/escuelas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(escuela.getId().intValue())))
            .andExpect(jsonPath("$.[*].fundacion").value(hasItem(DEFAULT_FUNDACION.toString())));
    }

    @Test
    @Transactional
    public void getEscuela() throws Exception {
        // Initialize the database
        escuelaRepository.saveAndFlush(escuela);

        // Get the escuela
        restEscuelaMockMvc.perform(get("/api/escuelas/{id}", escuela.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(escuela.getId().intValue()))
            .andExpect(jsonPath("$.fundacion").value(DEFAULT_FUNDACION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEscuela() throws Exception {
        // Get the escuela
        restEscuelaMockMvc.perform(get("/api/escuelas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEscuela() throws Exception {
        // Initialize the database
        escuelaRepository.saveAndFlush(escuela);
        int databaseSizeBeforeUpdate = escuelaRepository.findAll().size();

        // Update the escuela
        Escuela updatedEscuela = escuelaRepository.findOne(escuela.getId());
        // Disconnect from session so that the updates on updatedEscuela are not directly saved in db
        em.detach(updatedEscuela);
        updatedEscuela
            .fundacion(UPDATED_FUNDACION);

        restEscuelaMockMvc.perform(put("/api/escuelas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEscuela)))
            .andExpect(status().isOk());

        // Validate the Escuela in the database
        List<Escuela> escuelaList = escuelaRepository.findAll();
        assertThat(escuelaList).hasSize(databaseSizeBeforeUpdate);
        Escuela testEscuela = escuelaList.get(escuelaList.size() - 1);
        assertThat(testEscuela.getFundacion()).isEqualTo(UPDATED_FUNDACION);
    }

    @Test
    @Transactional
    public void updateNonExistingEscuela() throws Exception {
        int databaseSizeBeforeUpdate = escuelaRepository.findAll().size();

        // Create the Escuela

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEscuelaMockMvc.perform(put("/api/escuelas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(escuela)))
            .andExpect(status().isCreated());

        // Validate the Escuela in the database
        List<Escuela> escuelaList = escuelaRepository.findAll();
        assertThat(escuelaList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEscuela() throws Exception {
        // Initialize the database
        escuelaRepository.saveAndFlush(escuela);
        int databaseSizeBeforeDelete = escuelaRepository.findAll().size();

        // Get the escuela
        restEscuelaMockMvc.perform(delete("/api/escuelas/{id}", escuela.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Escuela> escuelaList = escuelaRepository.findAll();
        assertThat(escuelaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Escuela.class);
        Escuela escuela1 = new Escuela();
        escuela1.setId(1L);
        Escuela escuela2 = new Escuela();
        escuela2.setId(escuela1.getId());
        assertThat(escuela1).isEqualTo(escuela2);
        escuela2.setId(2L);
        assertThat(escuela1).isNotEqualTo(escuela2);
        escuela1.setId(null);
        assertThat(escuela1).isNotEqualTo(escuela2);
    }
}
