package com.sv.swell.web.rest;

import com.sv.swell.Swell2App;

import com.sv.swell.domain.Juez;
import com.sv.swell.repository.JuezRepository;
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
 * Test class for the JuezResource REST controller.
 *
 * @see JuezResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Swell2App.class)
public class JuezResourceIntTest {

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    @Autowired
    private JuezRepository juezRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restJuezMockMvc;

    private Juez juez;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final JuezResource juezResource = new JuezResource(juezRepository);
        this.restJuezMockMvc = MockMvcBuilders.standaloneSetup(juezResource)
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
    public static Juez createEntity(EntityManager em) {
        Juez juez = new Juez()
            .descripcion(DEFAULT_DESCRIPCION);
        return juez;
    }

    @Before
    public void initTest() {
        juez = createEntity(em);
    }

    @Test
    @Transactional
    public void createJuez() throws Exception {
        int databaseSizeBeforeCreate = juezRepository.findAll().size();

        // Create the Juez
        restJuezMockMvc.perform(post("/api/juezs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(juez)))
            .andExpect(status().isCreated());

        // Validate the Juez in the database
        List<Juez> juezList = juezRepository.findAll();
        assertThat(juezList).hasSize(databaseSizeBeforeCreate + 1);
        Juez testJuez = juezList.get(juezList.size() - 1);
        assertThat(testJuez.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
    }

    @Test
    @Transactional
    public void createJuezWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = juezRepository.findAll().size();

        // Create the Juez with an existing ID
        juez.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restJuezMockMvc.perform(post("/api/juezs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(juez)))
            .andExpect(status().isBadRequest());

        // Validate the Juez in the database
        List<Juez> juezList = juezRepository.findAll();
        assertThat(juezList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllJuezs() throws Exception {
        // Initialize the database
        juezRepository.saveAndFlush(juez);

        // Get all the juezList
        restJuezMockMvc.perform(get("/api/juezs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(juez.getId().intValue())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())));
    }

    @Test
    @Transactional
    public void getJuez() throws Exception {
        // Initialize the database
        juezRepository.saveAndFlush(juez);

        // Get the juez
        restJuezMockMvc.perform(get("/api/juezs/{id}", juez.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(juez.getId().intValue()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingJuez() throws Exception {
        // Get the juez
        restJuezMockMvc.perform(get("/api/juezs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateJuez() throws Exception {
        // Initialize the database
        juezRepository.saveAndFlush(juez);
        int databaseSizeBeforeUpdate = juezRepository.findAll().size();

        // Update the juez
        Juez updatedJuez = juezRepository.findOne(juez.getId());
        // Disconnect from session so that the updates on updatedJuez are not directly saved in db
        em.detach(updatedJuez);
        updatedJuez
            .descripcion(UPDATED_DESCRIPCION);

        restJuezMockMvc.perform(put("/api/juezs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedJuez)))
            .andExpect(status().isOk());

        // Validate the Juez in the database
        List<Juez> juezList = juezRepository.findAll();
        assertThat(juezList).hasSize(databaseSizeBeforeUpdate);
        Juez testJuez = juezList.get(juezList.size() - 1);
        assertThat(testJuez.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void updateNonExistingJuez() throws Exception {
        int databaseSizeBeforeUpdate = juezRepository.findAll().size();

        // Create the Juez

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restJuezMockMvc.perform(put("/api/juezs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(juez)))
            .andExpect(status().isCreated());

        // Validate the Juez in the database
        List<Juez> juezList = juezRepository.findAll();
        assertThat(juezList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteJuez() throws Exception {
        // Initialize the database
        juezRepository.saveAndFlush(juez);
        int databaseSizeBeforeDelete = juezRepository.findAll().size();

        // Get the juez
        restJuezMockMvc.perform(delete("/api/juezs/{id}", juez.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Juez> juezList = juezRepository.findAll();
        assertThat(juezList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Juez.class);
        Juez juez1 = new Juez();
        juez1.setId(1L);
        Juez juez2 = new Juez();
        juez2.setId(juez1.getId());
        assertThat(juez1).isEqualTo(juez2);
        juez2.setId(2L);
        assertThat(juez1).isNotEqualTo(juez2);
        juez1.setId(null);
        assertThat(juez1).isNotEqualTo(juez2);
    }
}
