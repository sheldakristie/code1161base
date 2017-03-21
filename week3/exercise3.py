"""Week 3, Exercise 3.

Steps on the way to making your own guessing game.
"""
from __future__ import division
from __future__ import print_function
from random import randint


def advancedGuessingGame():
    """Play a guessing game with a user.

    The exercise here is to rewrite the exampleGuessingGame() function
    from exercise 3, but to allow for:
    * a lower bound to be entered, e.g. guess numbers between 10 and 20
    * ask for a better input if the user gives a non integer value anywhere.
      I.e. throw away inputs like "ten" or "8!" but instead of crashing
      ask for another value.
    * chastise them if they pick a number outside the bounds.
    * see if you can find the other failure modes.
      There are three that I can think of. (They are tested for.)

    NOTE: whilst you CAN write this from scratch, and it'd be good for you to
    be able to eventually, it'd be better to take the code from exercise 2 and
    marge it with code from excercise 1.
    Remember to think modular. Try to keep your functions small and single
    purpose if you can!
    """
    low = getNum("Lower bound? ")
    high = getNum("Upper bound? ")
    while (high < low):
        high = getNum("Upper bound? ")

    num = randint(low, high)

    guess = getBound("what's your guess? ", low, high)
    while (int(guess) != num):
        print (guess, ' is wrong! Guess again!')
        guess = getBound("what's your guess? ", low, high)
    return "You got it!"


def getNum(message):
    get = raw_input(message)
    while (type(get) != int):
        get = raw_input(message)
    return get


def getBound(message, low, high):
    get = raw_input(message)
    while (type(get) != int or int(get) < low or int(get) > high):
        get = raw_input(message)
    return get


if __name__ == "__main__":
    advancedGuessingGame()
