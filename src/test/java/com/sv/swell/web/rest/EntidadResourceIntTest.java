package com.sv.swell.web.rest;

import com.sv.swell.Swell2App;

import com.sv.swell.domain.Entidad;
import com.sv.swell.repository.EntidadRepository;
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
 * Test class for the EntidadResource REST controller.
 *
 * @see EntidadResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Swell2App.class)
public class EntidadResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_REPRESENTANTE = "AAAAAAAAAA";
    private static final String UPDATED_REPRESENTANTE = "BBBBBBBBBB";

    private static final String DEFAULT_TELEFONOFIJO = "AAAAAAAAAA";
    private static final String UPDATED_TELEFONOFIJO = "BBBBBBBBBB";

    private static final String DEFAULT_CORREO = "AAAAAAAAAA";
    private static final String UPDATED_CORREO = "BBBBBBBBBB";

    private static final String DEFAULT_CELULAR = "AAAAAAAAAA";
    private static final String UPDATED_CELULAR = "BBBBBBBBBB";

    private static final String DEFAULT_DIRECCION = "AAAAAAAAAA";
    private static final String UPDATED_DIRECCION = "BBBBBBBBBB";

    private static final String DEFAULT_TELEFONO = "AAAAAAAAAA";
    private static final String UPDATED_TELEFONO = "BBBBBBBBBB";

    @Autowired
    private EntidadRepository entidadRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEntidadMockMvc;

    private Entidad entidad;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EntidadResource entidadResource = new EntidadResource(entidadRepository);
        this.restEntidadMockMvc = MockMvcBuilders.standaloneSetup(entidadResource)
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
    public static Entidad createEntity(EntityManager em) {
        Entidad entidad = new Entidad()
            .nombre(DEFAULT_NOMBRE)
            .representante(DEFAULT_REPRESENTANTE)
            .telefonofijo(DEFAULT_TELEFONOFIJO)
            .correo(DEFAULT_CORREO)
            .celular(DEFAULT_CELULAR)
            .direccion(DEFAULT_DIRECCION)
            .telefono(DEFAULT_TELEFONO);
        return entidad;
    }

    @Before
    public void initTest() {
        entidad = createEntity(em);
    }

    @Test
    @Transactional
    public void createEntidad() throws Exception {
        int databaseSizeBeforeCreate = entidadRepository.findAll().size();

        // Create the Entidad
        restEntidadMockMvc.perform(post("/api/entidads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(entidad)))
            .andExpect(status().isCreated());

        // Validate the Entidad in the database
        List<Entidad> entidadList = entidadRepository.findAll();
        assertThat(entidadList).hasSize(databaseSizeBeforeCreate + 1);
        Entidad testEntidad = entidadList.get(entidadList.size() - 1);
        assertThat(testEntidad.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testEntidad.getRepresentante()).isEqualTo(DEFAULT_REPRESENTANTE);
        assertThat(testEntidad.getTelefonofijo()).isEqualTo(DEFAULT_TELEFONOFIJO);
        assertThat(testEntidad.getCorreo()).isEqualTo(DEFAULT_CORREO);
        assertThat(testEntidad.getCelular()).isEqualTo(DEFAULT_CELULAR);
        assertThat(testEntidad.getDireccion()).isEqualTo(DEFAULT_DIRECCION);
        assertThat(testEntidad.getTelefono()).isEqualTo(DEFAULT_TELEFONO);
    }

    @Test
    @Transactional
    public void createEntidadWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = entidadRepository.findAll().size();

        // Create the Entidad with an existing ID
        entidad.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEntidadMockMvc.perform(post("/api/entidads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(entidad)))
            .andExpect(status().isBadRequest());

        // Validate the Entidad in the database
        List<Entidad> entidadList = entidadRepository.findAll();
        assertThat(entidadList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllEntidads() throws Exception {
        // Initialize the database
        entidadRepository.saveAndFlush(entidad);

        // Get all the entidadList
        restEntidadMockMvc.perform(get("/api/entidads?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(entidad.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].representante").value(hasItem(DEFAULT_REPRESENTANTE.toString())))
            .andExpect(jsonPath("$.[*].telefonofijo").value(hasItem(DEFAULT_TELEFONOFIJO.toString())))
            .andExpect(jsonPath("$.[*].correo").value(hasItem(DEFAULT_CORREO.toString())))
            .andExpect(jsonPath("$.[*].celular").value(hasItem(DEFAULT_CELULAR.toString())))
            .andExpect(jsonPath("$.[*].direccion").value(hasItem(DEFAULT_DIRECCION.toString())))
            .andExpect(jsonPath("$.[*].telefono").value(hasItem(DEFAULT_TELEFONO.toString())));
    }

    @Test
    @Transactional
    public void getEntidad() throws Exception {
        // Initialize the database
        entidadRepository.saveAndFlush(entidad);

        // Get the entidad
        restEntidadMockMvc.perform(get("/api/entidads/{id}", entidad.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(entidad.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.representante").value(DEFAULT_REPRESENTANTE.toString()))
            .andExpect(jsonPath("$.telefonofijo").value(DEFAULT_TELEFONOFIJO.toString()))
            .andExpect(jsonPath("$.correo").value(DEFAULT_CORREO.toString()))
            .andExpect(jsonPath("$.celular").value(DEFAULT_CELULAR.toString()))
            .andExpect(jsonPath("$.direccion").value(DEFAULT_DIRECCION.toString()))
            .andExpect(jsonPath("$.telefono").value(DEFAULT_TELEFONO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEntidad() throws Exception {
        // Get the entidad
        restEntidadMockMvc.perform(get("/api/entidads/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEntidad() throws Exception {
        // Initialize the database
        entidadRepository.saveAndFlush(entidad);
        int databaseSizeBeforeUpdate = entidadRepository.findAll().size();

        // Update the entidad
        Entidad updatedEntidad = entidadRepository.findOne(entidad.getId());
        // Disconnect from session so that the updates on updatedEntidad are not directly saved in db
        em.detach(updatedEntidad);
        updatedEntidad
            .nombre(UPDATED_NOMBRE)
            .representante(UPDATED_REPRESENTANTE)
            .telefonofijo(UPDATED_TELEFONOFIJO)
            .correo(UPDATED_CORREO)
            .celular(UPDATED_CELULAR)
            .direccion(UPDATED_DIRECCION)
            .telefono(UPDATED_TELEFONO);

        restEntidadMockMvc.perform(put("/api/entidads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEntidad)))
            .andExpect(status().isOk());

        // Validate the Entidad in the database
        List<Entidad> entidadList = entidadRepository.findAll();
        assertThat(entidadList).hasSize(databaseSizeBeforeUpdate);
        Entidad testEntidad = entidadList.get(entidadList.size() - 1);
        assertThat(testEntidad.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testEntidad.getRepresentante()).isEqualTo(UPDATED_REPRESENTANTE);
        assertThat(testEntidad.getTelefonofijo()).isEqualTo(UPDATED_TELEFONOFIJO);
        assertThat(testEntidad.getCorreo()).isEqualTo(UPDATED_CORREO);
        assertThat(testEntidad.getCelular()).isEqualTo(UPDATED_CELULAR);
        assertThat(testEntidad.getDireccion()).isEqualTo(UPDATED_DIRECCION);
        assertThat(testEntidad.getTelefono()).isEqualTo(UPDATED_TELEFONO);
    }

    @Test
    @Transactional
    public void updateNonExistingEntidad() throws Exception {
        int databaseSizeBeforeUpdate = entidadRepository.findAll().size();

        // Create the Entidad

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEntidadMockMvc.perform(put("/api/entidads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(entidad)))
            .andExpect(status().isCreated());

        // Validate the Entidad in the database
        List<Entidad> entidadList = entidadRepository.findAll();
        assertThat(entidadList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEntidad() throws Exception {
        // Initialize the database
        entidadRepository.saveAndFlush(entidad);
        int databaseSizeBeforeDelete = entidadRepository.findAll().size();

        // Get the entidad
        restEntidadMockMvc.perform(delete("/api/entidads/{id}", entidad.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Entidad> entidadList = entidadRepository.findAll();
        assertThat(entidadList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Entidad.class);
        Entidad entidad1 = new Entidad();
        entidad1.setId(1L);
        Entidad entidad2 = new Entidad();
        entidad2.setId(entidad1.getId());
        assertThat(entidad1).isEqualTo(entidad2);
        entidad2.setId(2L);
        assertThat(entidad1).isNotEqualTo(entidad2);
        entidad1.setId(null);
        assertThat(entidad1).isNotEqualTo(entidad2);
    }
}
