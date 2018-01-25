package com.sv.swell.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Miembro_junta.
 */
@Entity
@Table(name = "miembro_junta")
public class Miembro_junta implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "niveljerarquia")
    private String niveljerarquia;

    @OneToOne
    @JoinColumn(unique = true)
    private Persona persona;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNiveljerarquia() {
        return niveljerarquia;
    }

    public Miembro_junta niveljerarquia(String niveljerarquia) {
        this.niveljerarquia = niveljerarquia;
        return this;
    }

    public void setNiveljerarquia(String niveljerarquia) {
        this.niveljerarquia = niveljerarquia;
    }

    public Persona getPersona() {
        return persona;
    }

    public Miembro_junta persona(Persona persona) {
        this.persona = persona;
        return this;
    }

    public void setPersona(Persona persona) {
        this.persona = persona;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Miembro_junta miembro_junta = (Miembro_junta) o;
        if (miembro_junta.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), miembro_junta.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Miembro_junta{" +
            "id=" + getId() +
            ", niveljerarquia='" + getNiveljerarquia() + "'" +
            "}";
    }
}
