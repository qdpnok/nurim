package human.nurim_spring.service;

import human.nurim_spring.entity.Member;
import human.nurim_spring.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {
    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return memberRepository.findById(username)
                .map(this::createUserDetails)
                .orElseThrow(() -> new UsernameNotFoundException(username + "을 DB에서 찾을 수 없습니다."));
    }

    private UserDetails createUserDetails(Member member) {
        log.info("member in userDetailService: {}", member);

        GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(member.getStatus().toString());

        log.info("grantedAuthority : {}", grantedAuthority);

        return new User(
                String.valueOf(member.getId()),
                member.getPwd(),
                Collections.singleton(grantedAuthority)
        );
    }
}