package com.github.godnsheeps.mychat.util;

import lombok.extern.slf4j.Slf4j;

import java.util.function.Function;

/**
 * @author jcooky
 */
@Slf4j
public class Functions {
    public static interface FunctionWithException<T, R> {
        R apply(T t) throws Throwable;
    }

    public static <T, R> Function<T, R>
    wrapError(final FunctionWithException<T, R> f) {
        return t -> {
            try {
                return f.apply(t);
            } catch (Throwable e) {
                log.error(e.getMessage(), e);
                throw new RuntimeException(e);
            }
        };
    }
}
