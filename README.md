# Overview

The Covid-19 vaccine is still in limited supply. Those who qualify for access to it under phase 1b can sign up to receive it. However, to gain access to the vaccine many people have to refresh a web page and hope to sign up for an available vaccine slot before someone else does.

To avoid having to manually refresh the [HEB Vaccine Scheduler](https://vaccine.heb.com/scheduler) page to check for signup slots, the app calls the HEB (a grocery store in Texas) API about every 5 seconds to check for availabilty at stores within about 60 miles of my vacinity. The cities checked can be edited. If a vaccine signup spot is available at one of the nearby stores the app immediately sends a push notification to an app on iOS or Android devices called Pushover. A Pushover account is needed to make the push notification work (a free trial of this app is available). Upon tapping the notification the HEB vaccine signup website is automatically launched where one can sign up.

In total this app took about 1 hr to build and it worked to secure a vaccine slot the first morning it was used.
