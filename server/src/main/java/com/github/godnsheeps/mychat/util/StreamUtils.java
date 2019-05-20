package com.github.godnsheeps.mychat.util;

import java.util.Iterator;
import java.util.Objects;
import java.util.Spliterator;
import java.util.Spliterators;
import java.util.function.BiFunction;
import java.util.function.Function;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

public class StreamUtils {

    public static<A, B, C> Stream<C> zip(Stream<? extends A> a,
                                         Stream<? extends B> b,
                                         BiFunction<? super A, ? super B, ? extends C> zipper,
                                         Function<? super A, ? extends C> mergeA,
                                         Function<? super B, ? extends C> mergeB) {
        Objects.requireNonNull(zipper);
        Spliterator<? extends A> aSpliterator = Objects.requireNonNull(a).spliterator();
        Spliterator<? extends B> bSpliterator = Objects.requireNonNull(b).spliterator();

        int characteristics = aSpliterator.characteristics() & bSpliterator.characteristics() &
                ~(Spliterator.DISTINCT | Spliterator.SORTED);

        long zipSize = ((characteristics & Spliterator.SIZED) != 0)
                ? Math.min(aSpliterator.getExactSizeIfKnown(), bSpliterator.getExactSizeIfKnown())
                : -1;

        Iterator<A> aIterator = Spliterators.iterator(aSpliterator);
        Iterator<B> bIterator = Spliterators.iterator(bSpliterator);
        Iterator<C> cIterator = new Iterator<C>() {
            @Override
            public boolean hasNext() {
                return aIterator.hasNext() || bIterator.hasNext();
            }

            @Override
            public C next() {
                if (aIterator.hasNext() && bIterator.hasNext()) {
                    return zipper.apply(aIterator.next(), bIterator.next());
                } else if (aIterator.hasNext()) {
                    return mergeA.apply(aIterator.next());
                } else {
                    return mergeB.apply(bIterator.next());
                }
            }
        };

        Spliterator<C> split = Spliterators.spliterator(cIterator, zipSize, characteristics);
        return (a.isParallel() || b.isParallel())
                ? StreamSupport.stream(split, true)
                : StreamSupport.stream(split, false);
    }
}
