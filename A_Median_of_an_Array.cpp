#include <bits/stdc++.h>
using namespace std;
#define ll long long
#define endl "\n"
#define f0(i,b) for(ll i=0;i<b;i++)
#define f1(i,b) for(ll i=1;i<=b;i++)
#define srt(x) sort(x.begin(),x.end())
#define yeah cout<<"YES"
#define nah cout<<"NO"
#define nahh {nah;nl;return;}
#define nei cout<<"-1"
#define vi vector <ll>
#define vc vector <char>
#define mod 1000000007
#define nl cout<<"\n"
#define svi(a,n) f0(i,n){int tm;cin>>tm;a.push_back(tm);};
#define svc(a,n) f0(i,n){char tm;cin>>tm;a.push_back(tm);};
void dbg_out() { cerr << endl; }
template<typename Head, typename... Tail>
void dbg_out (Head H, Tail... T) { cerr << ' '<< H; dbg_out(T...); }
#define dbg(...) cerr << "(" << #__VA_ARGS__<< "):", dbg_out(__VA_ARGS__)
// bool isv(char c){string vow="aeiouAEIOU";f0(i,10){if(c==vow[i])return 1;}return 0;}
// bool isp(int n){if(n<2)return 0;for(ll i=2;i*i<=n;i++){if(n%i==0)return 0;}return 1;}
//ll gcd(ll a,ll b){while(b){ll t=b;b=a%b;a=t;}return a;}
// ll lcm(ll a,ll b){return (a/gcd(a,b))*b;}
// vi n2d(ll n){vi d;if(!n){d.push_back(0);return d;}while(n){d.insert(d.begin(),n%10);n/=10;}return d;}
void pvi(vi v){for(ll e:v){cout<<e<<' ';}}
void pvc(vc v){for(char e:v){cout<<e<<' ';}}
void slve();signed main(){ios::sync_with_stdio(0);cin.tie(0);cout.tie(0);ll t;cin>>t;while (t--){slve();}return 0;}
void slve(){ //WRITE BELOW:
    ll n;
    cin>>n;
    
    //nl;
}