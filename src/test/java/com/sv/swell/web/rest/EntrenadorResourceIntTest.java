package com.sv.swell.web.rest;

import com.sv.swell.Swell2App;

import com.sv.swell.domain.Entrenador;
import com.sv.swell.repository.EntrenadorRepository;
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
 * Test class for the EntrenadorResource REST controller.
 *
 * @see EntrenadorResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Swell2App.class)
public class EntrenadorResourceIntTest {

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    @Autowired
    private EntrenadorRepository entrenadorRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEntrenadorMockMvc;

    private Entrenador entrenador;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EntrenadorResource entrenadorResource = new EntrenadorResource(entrenadorRepository);
        this.restEntrenadorMockMvc = MockMvcBuilders.standaloneSetup(entrenadorResource)
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
    public static Entrenador createEntity(EntityManager em) {
        Entrenador entrenador = new Entrenador()
            .descripcion(DEFAULT_DESCRIPCION);
        return entrenador;
    }

    @Before
    public void initTest() {
        entrenador = createEntity(em);
    }

    @Test
    @Transactional
    public void createEntrenador() throws Exception {
        int databaseSizeBeforeCreate = entrenadorRepository.findAll().size();

        // Create the Entrenador
        restEntrenadorMockMvc.perform(post("/api/entrenadors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(entrenador)))
            .andExpect(status().isCreated());

        // Validate the Entrenador in the database
        List<Entrenador> entrenadorList = entrenadorRepository.findAll();
        assertThat(entrenadorList).hasSize(databaseSizeBeforeCreate + 1);
        Entrenador testEntrenador = entrenadorList.get(entrenadorList.size() - 1);
        assertThat(testEntrenador.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
    }

    @Test
    @Transactional
    public void createEntrenadorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = entrenadorRepository.findAll().size();

        // Create the Entrenador with an existing ID
        entrenador.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEntrenadorMockMvc.perform(post("/api/entrenadors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(entrenador)))
            .andExpect(status().isBadRequest());

        // Validate the Entrenador in the database
        List<Entrenador> entrenadorList = entrenadorRepository.findAll();
        assertThat(entrenadorList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllEntrenadors() throws Exception {
        // Initialize the database
        entrenadorRepository.saveAndFlush(entrenador);

        // Get all the entrenadorList
        restEntrenadorMockMvc.perform(get("/api/entrenadors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(entrenador.getId().intValue())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())));
    }

    @Test
    @Transactional
    public void getEntrenador() throws Exception {
        // Initialize the database
        entrenadorRepository.saveAndFlush(entrenador);

        // Get the entrenador
        restEntrenadorMockMvc.perform(get("/api/entrenadors/{id}", entrenador.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(entrenador.getId().intValue()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEntrenador() throws Exception {
        // Get the entrenador
        restEntrenadorMockMvc.perform(get("/api/entrenadors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEntrenador() throws Exception {
        // Initialize the database
        entrenadorRepository.saveAndFlush(entrenador);
        int databaseSizeBeforeUpdate = entrenadorRepository.findAll().size();

        // Update the entrenador
        Entrenador updatedEntrenador = entrenadorRepository.findOne(entrenador.getId());
        // Disconnect from session so that the updates on updatedEntrenador are not directly saved in db
        em.detach(updatedEntrenador);
        updatedEntrenador
            .descripcion(UPDATED_DESCRIPCION);

        restEntrenadorMockMvc.perform(put("/api/entrenadors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEntrenador)))
            .andExpect(status().isOk());

        // Validate the Entrenador in the database
        List<Entrenador> entrenadorList = entrenadorRepository.findAll();
        assertThat(entrenadorList).hasSize(databaseSizeBeforeUpdate);
        Entrenador testEntrenador = entrenadorList.get(entrenadorList.size() - 1);
        assertThat(testEntrenador.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void updateNonExistingEntrenador() throws Exception {
        int databaseSizeBeforeUpdate = entrenadorRepository.findAll().size();

        // Create the Entrenador

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEntrenadorMockMvc.perform(put("/api/entrenadors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(entrenador)))
            .andExpect(status().isCreated());

        // Validate the Entrenador in the database
        List<Entrenador> entrenadorList = entrenadorRepository.findAll();
        assertThat(entrenadorList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEntrenador() throws Exception {
        // Initialize the database
        entrenadorRepository.saveAndFlush(entrenador);
        int databaseSizeBeforeDelete = entrenadorRepository.findAll().size();

        // Get the entrenador
        restEntrenadorMockMvc.perform(delete("/api/entrenadors/{id}", entrenador.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Entrenador> entrenadorList = entrenadorRepository.findAll();
        assertThat(entrenadorList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Entrenador.class);
        Entrenador entrenador1 = new Entrenador();
        entrenador1.setId(1L);
        Entrenador entrenador2 = new Entrenador();
        entrenador2.setId(entrenador1.getId());
        assertThat(entrenador1).isEqualTo(entrenador2);
        entrenador2.setId(2L);
        assertThat(entrenador1).isNotEqualTo(entrenador2);
        entrenador1.setId(null);
        assertThat(entrenador1).isNotEqualTo(entrenador2);
    }
}
