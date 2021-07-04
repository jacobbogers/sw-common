package lambda;
/*
 * Copyright (c) 2013, 2021, Oracle and/or its affiliates. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 *   - Redistributions of source code must retain the above copyright
 *     notice, this list of conditions and the following disclaimer.
 *
 *   - Redistributions in binary form must reproduce the above copyright
 *     notice, this list of conditions and the following disclaimer in the
 *     documentation and/or other materials provided with the distribution.
 *
 *   - Neither the name of Oracle or the names of its
 *     contributors may be used to endorse or promote products derived
 *     from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
 * IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import java.util.List;
import java.util.Arrays;
import java.util.Comparator;
import java.util.Collection;
import java.util.function.Supplier;
import java.util.Set;
import java.util.HashSet;

public class MethodRef {

    // The method transferElements copies elements from one collection to
    // another

    public static <T, SOURCE extends Collection<T>, DEST extends Collection<T>> DEST transferElements(
            SOURCE sourceCollection, Supplier<DEST> collectionFactory) {

        DEST result = collectionFactory.get();
        for (T t : sourceCollection) {
            result.add(t);
        }
        return result;
    }

    public static void printList(String header, String trailer, Person[] list){
        System.out.println("==["+header+"]==");
        for (Person p : list) {
            p.printPerson();
        }
        System.out.println("==["+trailer+"]==");
    }

    public static void printSet(String header, String trailer, Set<Person> set){
        System.out.println("==["+header+"]==");
        for (Person p : set) {
            p.printPerson();
        }
        System.out.println("==["+trailer+"]==");
    }

    // main
    public static void main(String... args) {

        MethodRef myApp = new MethodRef();
        List<Person> roster = Person.createRoster();
        Person[] rosterAsArray = new Person[roster.size()];
        roster.toArray(rosterAsArray);
        MethodRef.printList("initial","initial-end", rosterAsArray);

        // rosterAsArray,
        // myApp
                
        // implements 
        class PersonAgeComparator implements Comparator<Person> {
            public int compare(Person a, Person b) {
                return a.getBirthday().compareTo(b.getBirthday());
            }
        }

        // Without method reference
        Arrays.sort(rosterAsArray, new PersonAgeComparator());

        // With lambda expression
        Arrays.sort(rosterAsArray, (Person a, Person b) -> {
            return a.getBirthday().compareTo(b.getBirthday());
        });

        MethodRef.printList("printing rosterSet:","end", rosterAsArray);
        
        // With method reference
        Arrays.sort(rosterAsArray, Person::compareByAge);

        MethodRef.printList("Sorted by Age:","", rosterAsArray);

        // Reference to an instance method of a particular object
        class ComparisonProvider {
            public int compareByName(Person a, Person b) {
                return a.getName().compareTo(b.getName());
            }

            public int compareByAge(Person a, Person b) {
                return a.getBirthday().compareTo(b.getBirthday());
            }
        }

        ComparisonProvider myComparisonProvider = new ComparisonProvider();

        Arrays.sort(rosterAsArray, myComparisonProvider::compareByName);
        MethodRef.printList("Sorted by Name:","", rosterAsArray);

        Arrays.sort(rosterAsArray, myComparisonProvider::compareByAge);
        MethodRef.printList("Sorted by Age:","", rosterAsArray);

        // Reference to an instance method
        // of an arbitrary object of a particular type

        String[] stringArray = { "Barbara", "James", "Mary", "John", "Patricia", "Robert", "Michael", "Linda" };
        // doesnt have to be static, (in case it is not)
        // will turn this 
        // from
        //    "String::compareToIgnoreCase(a,b)" 
        // TO 
        //    "a.compareToIgnoreCase(b)"
        Arrays.sort(stringArray, String::compareToIgnoreCase);

        // lambda returning a set
        Set<Person> rosterSetLambda = transferElements(roster, () -> {
            return new HashSet<Person>();
        });
        MethodRef.printSet("Sorted by Age:","", rosterSetLambda);

        // lusing a method ref to lamda
        Set<Person> rosterSet = transferElements(roster, HashSet::new);
        MethodRef.printSet("Sorted by Age:","", rosterSet);
    }
}
