# -*- coding: UTF-8 -*-
"""Refactoring.

This excercise is very similar to week 2, exercise 2. It contains a complete
and working example, but it's very poorly written.

Your job is to go through it and make it as good as you can.

That means making it self-documenting wherever possible, adding comments where
it isn't. Take repeated code and make it into a function. Also use functions
to encapsulate concepts. If something is done many times, maybe a map or a loop
is called for. Etc.

The resulting file should feel as close to english as possible.
It must also pass the linter.

This is the first file that will be run against the pydocstyle checker. If
you've run the week5_system_prep.sh file you should be getting blue linter dots
that show you where lintere errors are. If they aren't working, you should be
getting the errors in the test output.

Some functions will have directions as external comments, once you think you
are on top of it, take these comments out. Others won't have comments and
you'll need to figure out for yourself what to do.
"""

from __future__ import division
from __future__ import print_function
import math
import requests


def countdown(message, start, stop, completion_message):
    """Return a lit of countdown messages, much like in the bad function.

    It should say something different in the last message.
    """
    retList = []
    if (stop > start):
        for i in range(start, stop):
            retList.append(message + str(i))
    elif (stop < start):
        for i in range(stop, start):
            retList.append(message + str(i))
    retList.append(completion_message)
    return retList


# TRIANGLES


# This should be a series of functions that are ultimatly used by
# triangle_master
# It should eventually return a dictionary of triangle facts. It should
# optionally print information as a nicely formatted string. Make printing
# turned off by default but turned on with an optional argument.
# The stub functions are made for you, and each one is tested, so this should
# hand hold quite nicely.
def calculate_hypotenuse(base, height):
    """Hypotenuse^2 = base^2 x height^2."""
    return math.sqrt(base * base + height * height)


def calculate_area(base, height):
    """A = (1/2)BH."""
    return (base * height * 0.5)


def calculate_perimeter(base, height):
    """P = B + H + hypotenuse)."""
    return (base + height + calculate_hypotenuse(base, height))


def calculate_aspect(base, height):
    """Return the aspect as a string."""
    if (height > base):
        return "tall"
    if (base > height):
        return "wide"
    if (base == height):
        return "equal"


# Make sure you reuse the functions you've already got
# Don't reinvent the wheel
def get_triangle_facts(base, height, units="mm"):
    """Return all the facts in a dictionary."""
    return {"area": calculate_area(base, height),
            "perimeter": calculate_perimeter(base, height),
            "height": height,
            "base": base,
            "hypotenuse": calculate_hypotenuse(base, height),
            "aspect": calculate_aspect(base, height),
            "units": units}


# this should return a multi line string that looks a bit like this:
#
# 15
# |
# |     |\
# |____>| \  17.0
#       |  \
#       |   \
#       ------
#       8
# This triangle is 60.0mm²
# It has a perimeter of 40.0mm
# This is a tall triangle.
#
# but with the values and shape that relate to the specific
# triangle we care about.
def tell_me_about_this_right_triangle(facts_dictionary):
    """Return a diagram as a string."""
    tall = """
            {height}
            |
            |     |\\
            |____>| \\  {hypotenuse}
                  |  \\
                  |   \\
                  ------
                  {base}"""
    wide = """
            {hypotenuse}
             ↓         ∕ |
                   ∕     | <-{height}
               ∕         |
            ∕------------|
              {base}"""
    equal = """
            {height}
            |
            |     |⋱
            |____>|  ⋱ <-{hypotenuse}
                  |____⋱
                  {base}"""

    pattern = ("This triangle is {area}{units}²\n"
               "It has a perimeter of {perimeter}{units}\n"
               "This is a {aspect} triangle.\n")

    facts = pattern.format(**facts_dictionary)
    asp = facts_dictionary.get("aspect")
    if (asp == "tall"):
        return tall + facts
    elif (asp == "wide"):
        return wide + facts
    elif (asp == "equal"):
        return equal + facts


# docstring
def triangle_master(base,
                    height,
                    return_diagram=False,
                    return_dictionary=False):
    """Return dictionary, diagram, both or neither."""
    triangle_dict = get_triangle_facts(base, height)
    triangle_diag = tell_me_about_this_right_triangle(triangle_dict)

    if return_diagram and return_dictionary:
        return {"facts": triangle_dict, "diagram": triangle_diag}
    elif return_diagram:
        return triangle_diag
    elif return_dictionary:
        return {"facts": triangle_dict, "diagram": None}
    else:
        print("You're an odd one, you don't want anything!")


def wordy_pyramid():
    """Refactor wordy_pyramid using my functions."""
    pyramid_list = list_of_words_with_lengths(list(range(3, 21, 2)))
    pyramid_list += list_of_words_with_lengths(list(range(20, 3, -2)))

    return pyramid_list


def get_a_word_of_length_n(length):
    """If length > 0 and is int, return word of that length from site."""
    if type(length) != int:
        return None
    elif length <= 0:
        return None
    else:
        url = 'http://www.setgetgo.com/randomword/get.php?len='
        r = requests.get(url + str(length))
        return r.content


def list_of_words_with_lengths(list_of_lengths):
    """Iterate through list_of_lengths and return list populated with words."""
    retList = []
    for l in list_of_lengths:
        retList.append(get_a_word_of_length_n(l))
    return retList


# if __name__ == "__main__":
    # do_bunch_of_bad_things()
