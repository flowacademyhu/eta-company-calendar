package hu.flowacademy.companycalendar.config;


import hu.flowacademy.companycalendar.model.Roles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;

@EnableWebSecurity
@EnableResourceServer
@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter implements ResourceServerConfigurer {

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    public void configure(ResourceServerSecurityConfigurer resources) throws Exception {}

    @Override
    public void configure(final HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers("/", "/oauth/**", "/oauth/token/revokeById/**", "/tokens/**").permitAll()
                .antMatchers(HttpMethod.GET, "/users").authenticated()
                .antMatchers("/users").hasAnyAuthority(Roles.ADMIN.toString())
                .anyRequest().authenticated()
                .and().formLogin().permitAll()
                .and().csrf().disable();
    }

}
