package com.sv.swell.web.rest;

import com.sv.swell.Swell2App;

import com.sv.swell.domain.Miembro_junta;
import com.sv.swell.repository.Miembro_juntaRepository;
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
import java.util.List;

import static com.sv.swell.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the Miembro_juntaResource REST controller.
 *
 * @see Miembro_juntaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Swell2App.class)
public class Miembro_juntaResourceIntTest {

    private static final String DEFAULT_NIVELJERARQUIA = "AAAAAAAAAA";
    private static final String UPDATED_NIVELJERARQUIA = "BBBBBBBBBB";

    @Autowired
    private Miembro_juntaRepository miembro_juntaRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMiembro_juntaMockMvc;

    private Miembro_junta miembro_junta;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final Miembro_juntaResource miembro_juntaResource = new Miembro_juntaResource(miembro_juntaRepository);
        this.restMiembro_juntaMockMvc = MockMvcBuilders.standaloneSetup(miembro_juntaResource)
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
    public static Miembro_junta createEntity(EntityManager em) {
        Miembro_junta miembro_junta = new Miembro_junta()
            .niveljerarquia(DEFAULT_NIVELJERARQUIA);
        return miembro_junta;
    }

    @Before
    public void initTest() {
        miembro_junta = createEntity(em);
    }

    @Test
    @Transactional
    public void createMiembro_junta() throws Exception {
        int databaseSizeBeforeCreate = miembro_juntaRepository.findAll().size();

        // Create the Miembro_junta
        restMiembro_juntaMockMvc.perform(post("/api/miembro-juntas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(miembro_junta)))
            .andExpect(status().isCreated());

        // Validate the Miembro_junta in the database
        List<Miembro_junta> miembro_juntaList = miembro_juntaRepository.findAll();
        assertThat(miembro_juntaList).hasSize(databaseSizeBeforeCreate + 1);
        Miembro_junta testMiembro_junta = miembro_juntaList.get(miembro_juntaList.size() - 1);
        assertThat(testMiembro_junta.getNiveljerarquia()).isEqualTo(DEFAULT_NIVELJERARQUIA);
    }

    @Test
    @Transactional
    public void createMiembro_juntaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = miembro_juntaRepository.findAll().size();

        // Create the Miembro_junta with an existing ID
        miembro_junta.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMiembro_juntaMockMvc.perform(post("/api/miembro-juntas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(miembro_junta)))
            .andExpect(status().isBadRequest());

        // Validate the Miembro_junta in the database
        List<Miembro_junta> miembro_juntaList = miembro_juntaRepository.findAll();
        assertThat(miembro_juntaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllMiembro_juntas() throws Exception {
        // Initialize the database
        miembro_juntaRepository.saveAndFlush(miembro_junta);

        // Get all the miembro_juntaList
        restMiembro_juntaMockMvc.perform(get("/api/miembro-juntas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(miembro_junta.getId().intValue())))
            .andExpect(jsonPath("$.[*].niveljerarquia").value(hasItem(DEFAULT_NIVELJERARQUIA.toString())));
    }

    @Test
    @Transactional
    public void getMiembro_junta() throws Exception {
        // Initialize the database
        miembro_juntaRepository.saveAndFlush(miembro_junta);

        // Get the miembro_junta
        restMiembro_juntaMockMvc.perform(get("/api/miembro-juntas/{id}", miembro_junta.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(miembro_junta.getId().intValue()))
            .andExpect(jsonPath("$.niveljerarquia").value(DEFAULT_NIVELJERARQUIA.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMiembro_junta() throws Exception {
        // Get the miembro_junta
        restMiembro_juntaMockMvc.perform(get("/api/miembro-juntas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMiembro_junta() throws Exception {
        // Initialize the database
        miembro_juntaRepository.saveAndFlush(miembro_junta);
        int databaseSizeBeforeUpdate = miembro_juntaRepository.findAll().size();

        // Update the miembro_junta
        Miembro_junta updatedMiembro_junta = miembro_juntaRepository.findOne(miembro_junta.getId());
        // Disconnect from session so that the updates on updatedMiembro_junta are not directly saved in db
        em.detach(updatedMiembro_junta);
        updatedMiembro_junta
            .niveljerarquia(UPDATED_NIVELJERARQUIA);

        restMiembro_juntaMockMvc.perform(put("/api/miembro-juntas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMiembro_junta)))
            .andExpect(status().isOk());

        // Validate the Miembro_junta in the database
        List<Miembro_junta> miembro_juntaList = miembro_juntaRepository.findAll();
        assertThat(miembro_juntaList).hasSize(databaseSizeBeforeUpdate);
        Miembro_junta testMiembro_junta = miembro_juntaList.get(miembro_juntaList.size() - 1);
        assertThat(testMiembro_junta.getNiveljerarquia()).isEqualTo(UPDATED_NIVELJERARQUIA);
    }

    @Test
    @Transactional
    public void updateNonExistingMiembro_junta() throws Exception {
        int databaseSizeBeforeUpdate = miembro_juntaRepository.findAll().size();

        // Create the Miembro_junta

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMiembro_juntaMockMvc.perform(put("/api/miembro-juntas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(miembro_junta)))
            .andExpect(status().isCreated());

        // Validate the Miembro_junta in the database
        List<Miembro_junta> miembro_juntaList = miembro_juntaRepository.findAll();
        assertThat(miembro_juntaList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteMiembro_junta() throws Exception {
        // Initialize the database
        miembro_juntaRepository.saveAndFlush(miembro_junta);
        int databaseSizeBeforeDelete = miembro_juntaRepository.findAll().size();

        // Get the miembro_junta
        restMiembro_juntaMockMvc.perform(delete("/api/miembro-juntas/{id}", miembro_junta.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Miembro_junta> miembro_juntaList = miembro_juntaRepository.findAll();
        assertThat(miembro_juntaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Miembro_junta.class);
        Miembro_junta miembro_junta1 = new Miembro_junta();
        miembro_junta1.setId(1L);
        Miembro_junta miembro_junta2 = new Miembro_junta();
        miembro_junta2.setId(miembro_junta1.getId());
        assertThat(miembro_junta1).isEqualTo(miembro_junta2);
        miembro_junta2.setId(2L);
        assertThat(miembro_junta1).isNotEqualTo(miembro_junta2);
        miembro_junta1.setId(null);
        assertThat(miembro_junta1).isNotEqualTo(miembro_junta2);
    }
}
