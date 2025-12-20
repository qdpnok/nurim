package human.nurim_spring.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class RedisTestController {

    private final StringRedisTemplate redisTemplate;

    @GetMapping("/redis-test")
    public String testRedis() {
        try {
            ValueOperations<String, String> vop = redisTemplate.opsForValue();
            vop.set("testKey", "연결성공"); // Redis에 글자 쓰기
            String value = vop.get("testKey");      // Redis에서 글자 읽기

            return "🎉 Redis 연결 성공! 가져온 값: " + value;
        } catch (Exception e) {
            return "Redis 연결 실패! 에러 내용: " + e.getMessage();
        }
    }
}