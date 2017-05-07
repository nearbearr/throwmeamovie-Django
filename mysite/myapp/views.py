# from django.shortcuts import render

# Create your views here.
# from django.shortcuts import render_to_response
#
import requests
from BeautifulSoup import BeautifulSoup

import re
import random
from django.shortcuts import render
from myapp.models import Users, Friends, Collection
# from django.db import connection
from django.db.models import Q
# from django.template import RequestContext

# def index(request):
#     return render_to_response(request, 'index.html')

from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.template import loader

def index(request):
    # return HttpResponse(template.render(request))
    return render(request, 'myapp/index.html')

def about(request):
    return render(request, 'myapp/about.html')

@csrf_exempt
def regUserDb(request):
    if request.method == 'POST':
        if 'id' in request.POST:
            fb_id = request.POST['id']
            name = request.POST['name']
            email = request.POST['email']
            if(Users.objects.filter(fb_id = fb_id).count()>0):
                return HttpResponse('duplicate')
            else:
                user = Users(
                    fb_id = fb_id,
                    name = name,
                    email = email
                )
                user.save()
                return HttpResponse('success') # if everything is OK
    # nothing went well
    return HttpResponse('FAIL!!!!!')


@csrf_exempt
def regExpPref(request):
    if request.method == 'POST':
        if 'id' in request.POST:
            fb_id = request.POST['id']
            expPreference1 = request.POST['expPref1']
            expPreference2 = request.POST['expPref2']

            user = Users.objects.get(fb_id = fb_id)
            user.expPreference1 = expPreference1
            user.expPreference2 = expPreference2
            user.save()

            return HttpResponse('success') # if everything is OK
    # nothing went well
    return HttpResponse('FAIL!!!!!')


@csrf_exempt
def regFriendsDb(request):
    if request.method == 'POST':
        dataArr = request.POST.getlist('data[]')
        fb_id = dataArr[len(dataArr)-1]
        # dataArr1 = list(dataArr)
        for i in range(len(dataArr)-1):
            if(Friends.objects.filter(fb_id=fb_id).filter(friends_id=dataArr[i]).count()>0):
                continue
            elif(Friends.objects.filter(fb_id=dataArr[i]).filter(friends_id=fb_id).count()>0):
                continue
            else:
                friends = Friends(
                    fb_id = fb_id,
                    friends_id = dataArr[i]
                )
                friends.save()
        return HttpResponse('success') # if everything is OK
    # nothing went well
    return HttpResponse('FAIL!!!!!')


@csrf_exempt
def recUnrecognizedSort(request):
    if request.method == 'POST':
        unrecognized = request.POST['unrecognized']
        url = 'https://www.google.co.in/search?q=imdb+' + unrecognized
        response = requests.get(url)
    	html = response.content
    	soup = BeautifulSoup(html)
    	div1=soup.find("h3",attrs= {"class": "r"})
    	div2=div1.find("a")
    	div3=div2.find("b")
    	div4=div3.text.replace("<b>","")
        return HttpResponse(div4) # if everything is OK
    # nothing went well
    return HttpResponse('FAIL!!!!!')


@csrf_exempt
def saveCollection(request):
    if request.method == 'POST':
        fb_id = request.POST['fb_id']
        imdbID = request.POST['imdbID']
        title = request.POST['title']
        imdbRating = request.POST['imdbRating']
        tomatoeRating = request.POST['tomatoeRating']
        year = request.POST['year']
        genre1 = request.POST['genre1']
        genre2 = request.POST['genre2']
        genre3 = request.POST['genre3']
        if(Collection.objects.filter(fb_id=fb_id).filter(imdbID=imdbID).count()>0):
        	return HttpResponse('duplicate')
        else:
            collection = Collection(
                fb_id = fb_id,
                imdbID = imdbID,
                title = title,
                imdbRating = imdbRating,
                tomatoeRating = tomatoeRating,
                year = year,
                genre1 = genre1,
                genre2 = genre2,
                genre3 = genre3,
                watched = 'f'
            )
            collection.save()
            return HttpResponse('success') # if everything is OK
    # nothing went well
    return HttpResponse('FAIL!!!!!')


@csrf_exempt
def derpref(request):
    if request.method == 'POST':
        fb_id = request.POST['id']
        filter1 = Collection.objects.filter(fb_id = fb_id)

        pref = {'Drama': filter1.filter(Q(genre1 = 'Drama') | Q(genre2 = 'Drama') | Q(genre3 = 'Drama')).count(), 'Action': filter1.filter(Q(genre1 = 'Action') | Q(genre2 = 'Action') | Q(genre3 = 'Action')).count(), 'Comedy': filter1.filter(Q(genre1 = 'Comedy') | Q(genre2 = 'Comedy') | Q(genre3 = 'Comedy')).count(), 'SciFi': filter1.filter(Q(genre1 = 'Sci-Fi') | Q(genre2 = 'Sci-Fi') | Q(genre3 = 'Sci-Fi')).count(), 'Crime': filter1.filter(Q(genre1 = 'Crime') | Q(genre2 = 'Crime') | Q(genre3 = 'Crime')).count(), 'Thriller': filter1.filter(Q(genre1 = 'Thriller') | Q(genre2 = 'Thriller') | Q(genre3 = 'Thriller')).count(), 'Mystery': filter1.filter(Q(genre1 = 'Mystery') | Q(genre2 = 'Mystery') | Q(genre3 = 'Mystery')).count(), 'Romance': filter1.filter(Q(genre1 = 'Romance') | Q(genre2 = 'Romance') | Q(genre3 = 'Romance')).count(), 'Adventure': filter1.filter(Q(genre1 = 'Adventure') | Q(genre2 = 'Adventure') | Q(genre3 = 'Adventure')).count(), 'Biography': filter1.filter(Q(genre1 = 'Biography') | Q(genre2 = 'Biography') | Q(genre3 = 'Biography')).count(), 'Documentary': filter1.filter(Q(genre1 = 'Documentary') | Q(genre2 = 'Documentary') | Q(genre3 = 'Documentary')).count(), 'Sport': filter1.filter(Q(genre1 = 'Sport') | Q(genre2 = 'Sport') | Q(genre3 = 'Sport')).count(), 'Family': filter1.filter(Q(genre1 = 'Family') | Q(genre2 = 'Family') | Q(genre3 = 'Family')).count(), 'Short': filter1.filter(Q(genre1 = 'Short') | Q(genre2 = 'Short') | Q(genre3 = 'Short')).count(), 'Horror': filter1.filter(Q(genre1 = 'Horror') | Q(genre2 = 'Horror') | Q(genre3 = 'Horror')).count(), 'History': filter1.filter(Q(genre1 = 'History') | Q(genre2 = 'History') | Q(genre3 = 'History')).count(), 'Fantasy': filter1.filter(Q(genre1 = 'Fantasy') | Q(genre2 = 'Fantasy') | Q(genre3 = 'Fantasy')).count(), 'Animation': filter1.filter(Q(genre1 = 'Animation') | Q(genre2 = 'Animation') | Q(genre3 = 'Animation')).count(), 'Music': filter1.filter(Q(genre1 = 'Music') | Q(genre2 = 'Music') | Q(genre3 = 'Music')).count()}

        pref1 = max(pref, key=pref.get)
        del pref[pref1]
        pref2 = max(pref, key=pref.get)

        user = Users.objects.get(fb_id = fb_id)
        user.derPreference1 = pref1
        user.derPreference2 = pref2
        user.save()

        return HttpResponse('success') # if everything is OK
    # nothing went well
    return HttpResponse('FAIL!!!!!')


@csrf_exempt
def throwFromMyCollection(request):
    if request.method == 'POST':
        fb_id = request.POST['id']
        user = Users.objects.get(fb_id = fb_id)
        derPref1 = user.derPreference1
        derPref2 = user.derPreference2
        expPref1 = user.expPreference1
        expPref2 = user.expPreference2

        resultvar= derPref1
        #all 4 are same, 4x
        if(derPref1==derPref2==expPref1==expPref2):
            resultvar=derPref1
        # 3 are same, x x x y
        elif(derPref1==derPref2==expPref1):
            resultvar=derPref1
        # 3x, x x y x
        elif(derPref1==derPref2==expPref2):
            resultvar=derPref1
        # 3x, y x x x
        elif(derPref2==expPref1==expPref2):
            resultvar=derPref2
        # 3x, x y x x
        elif(derPref1==expPref1==expPref2):
            resultvar=derPref1
        # 2x, x x y y
        elif(derPref1==derPref2 and expPref1==expPref2):
            list=[derPref1,expPref1]
            resultvar= random.choice(list)
        # 2x, x y x y or x y y x
        elif((derPref1==expPref1 and derPref2==expPref2) or (derPref1==expPref2 and derPref2==expPref1)):
            list=[derPref1,derPref2]
            resultvar= random.choice(list)
        # 2x, x x y z
        elif(derPref1==derPref2):
            resultvar= derPref1
        #2x, x y x z or x y z x
        elif(derPref1==expPref1 or derPref1==expPref2):
            resultvar=derPref1
        #2x, y x x z or y x z x
        elif(derPref2==expPref1 or derPref2==expPref2):
            resultvar=derPref2
        #2x, y z x x
        elif(expPref1==expPref2):
            resultvar=expPref1
        else:
            list=[derPref1,derPref2,expPref1,expPref2]
            resultvar=random.choice(list)

        resultVar = resultvar
        resultMovList = Collection.objects.filter(fb_id=fb_id).filter(Q(genre1 = resultVar) | Q(genre2 = resultVar) | Q(genre3 = resultVar))
        resultMov = random.choice(resultMovList)
        # result =[]
        return HttpResponse(resultMov.title) # if everything is OK
    # nothing went well
    return HttpResponse('FAIL!!!!!')


@csrf_exempt
def throwFromGlobal(request):
    if request.method == 'POST':
        genre = request.POST['genre']
        url = 'http://www.imdb.com/search/title?genres='+genre+'&sort=user_rating,desc&title_type=feature&num_votes=25000,'
        response = requests.get(url)
        html = response.content
        soup = BeautifulSoup(html)
        list1 = soup.findAll("h3",attrs= {"class": "lister-item-header"})
        result1 = random.choice(list1)
        result2 = str(result1)
        match = re.search(r'(?<=adv_li_tt">)([^<>]+)', result2)
        result3 = match.group(0)
        return HttpResponse(result3) # if everything is OK
        # nothing went well
    return HttpResponse('FAIL!!!!!')
