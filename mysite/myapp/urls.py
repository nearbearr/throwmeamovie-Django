from django.conf.urls import url

from . import views

urlpatterns = [
    # url(r'', views.index, name ='index2'),
    url(r'^home/', views.index, name='index'),
    url(r'^about/', views.about, name='about'),
    url(r'^regUserDb/', views.regUserDb, name='regUserDb'),
    url(r'^regExpPref/', views.regExpPref, name='regExpPref'),
    url(r'^regFriendsDb/', views.regFriendsDb, name='regFriendsDb'),
    url(r'^recUnrecognizedSort/', views.recUnrecognizedSort, name='recUnrecognizedSort'),
    url(r'^saveCollection/', views.saveCollection, name='saveCollection'),
    url(r'^derpref/', views.derpref, name='derpref'),
    url(r'^throwFromMyCollection/', views.throwFromMyCollection, name='throwFromMyCollection'),
    url(r'^throwFromGlobal/', views.throwFromGlobal, name='throwFromGlobal'),
]
