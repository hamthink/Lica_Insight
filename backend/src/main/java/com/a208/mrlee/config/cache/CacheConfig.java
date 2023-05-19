package com.a208.mrlee.config.cache;

import com.google.common.cache.CacheBuilder;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CachingConfigurerSupport;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.concurrent.ConcurrentMapCache;
import org.springframework.cache.concurrent.ConcurrentMapCacheManager;
import org.springframework.cache.support.SimpleCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Configuration
@EnableCaching
public class CacheConfig extends CachingConfigurerSupport {

    @Bean
    public CacheManager cacheManager() {
        SimpleCacheManager cacheManager = new SimpleCacheManager();
        cacheManager.setCaches(Arrays.asList(emailCache() , authCache()));
        return cacheManager;
    }

    @Bean
    public Cache emailCache() {
        return new ConcurrentMapCache("email",
                CacheBuilder.newBuilder().expireAfterWrite(3, TimeUnit.MINUTES).maximumSize(100).build().asMap(),
                false);
    }

    @Bean
    public Cache authCache() {
        return new ConcurrentMapCache("auth",
                CacheBuilder.newBuilder().expireAfterWrite(10, TimeUnit.MINUTES).maximumSize(100).build().asMap(),
                false);
    }
}
