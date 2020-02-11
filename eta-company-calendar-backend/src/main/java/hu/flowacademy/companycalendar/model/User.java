package hu.flowacademy.companycalendar.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Table;

@Data
@Entity
@Table
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    private  Long id;
}
