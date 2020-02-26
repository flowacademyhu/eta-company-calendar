package hu.flowacademy.companycalendar.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import javax.validation.constraints.NotBlank;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "_users")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User implements UserDetails {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank
  @Column(unique = true)
  private String email;

  private String password;

  @Enumerated(EnumType.STRING)
  private Roles role;

  @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
  @JsonManagedReference
  private Profile profile;

  @ManyToOne
  private User leader;

  @OneToMany(mappedBy = "leader", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
  private List<User> employees;

  @JsonIgnore
  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return List.of(new SimpleGrantedAuthority(this.role.name()));
  }

  @Override
  public String getUsername() {
    return this.getEmail();
  }

  @Override
  @JsonIgnore
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  @JsonIgnore
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  @JsonIgnore
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  @JsonIgnore
  public boolean isEnabled() {
    return true;
  }

}