 /*
Avgle X JSBox

简介：

你口袋里的观影利器。

声明:

1. 脚本含成人内容，未满十八岁禁止运行

2. 脚本所有内容来自 https://www.avgle.com 与脚本作者无任何关系

3. 脚本制作纯属技术交流，无任何商业利益或传播淫秽目的


By Nicked

https://t.me/nicked

*/

 version = 4.33
 $addin.current.version=version
 times = $cache.get("times") || 4
 const avIcon = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4RyqRXhpZgAATU0AKgAAAAgABwEaAAUAAAABAAAAYgEbAAUAAAABAAAAagEoAAMAAAABAAIAAAExAAIAAAAkAAAAcgEyAAIAAAAUAAAAlgITAAMAAAABAAEAAIdpAAQAAAABAAAAqgAAASQAAABIAAAAAQAAAEgAAAABQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkAMjAxNzowNzoxNCAxNToxMzo1NgAACJAAAAcAAAAEMDIyMZAEAAIAAAAUAAABEJEBAAcAAAAEAQIDAKAAAAcAAAAEMDEwMKABAAMAAAABAAEAAKACAAQAAAABAAAAQqADAAQAAAABAAAAQqQGAAMAAAABAAAAAAAAAAAyMDE3OjA3OjE0IDE1OjEzOjU2AAAGAQMAAwAAAAEABgAAARoABQAAAAEAAAFyARsABQAAAAEAAAF6ASgAAwAAAAEAAgAAAgEABAAAAAEAAAGCAgIABAAAAAEAABseAAAAAAAAAEgAAAABAAAASAAAAAH/2P/AABEIAKAAoAMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2wBDAAEBAQEBAQIBAQIDAgICAwQDAwMDBAUEBAQEBAUGBQUFBQUFBgYGBgYGBgYHBwcHBwcICAgICAkJCQkJCQkJCQn/2wBDAQEBAQICAgQCAgQJBgUGCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQn/3QAEAAr/2gAMAwEAAhEDEQA/AP7+KKKKACiiigBCcDNRGQ43DgVKeleA/tE/Fq3+DPwr1b4gTkBdPRWIJC/ecL1IPr6Vhia0KcHUn0O/K8tq4vEQw9HeTSXqz3EvGThmH504vEcFnUYPrX8o+vf8FdPjLBrdyLC6mEAkYIN0ONuTj/ll6Vkj/gr38bHcDzpiR/tQ/wDxqvzR+LuXe0lTs9P67n9c4L6E3F+IpRrxcLNX3f8A8if1nSSREZUjcP8APrTkYMMZBPtX8mTf8Fd/jkM7ridfTmH/AONV+r3/AATl/ba1/wDaQluNH8YSM16JZNm9kzsRFPRVXjJr1ck8QcFjaqp03Zs+Q47+irxPkGXzzHGKLhBXdm9F9yP13LYbFIzYOKQj5+tDqc5FfetLc/mRX6ibctz3p+cNg0o6AVExyc03K44xtsSBcMTTqKKQ0gooooAKKKKAP//Q/v4ooooAYS+8ADjuaQvk7V5PWhySNq9T60jMCMCgaQpLbckfWvw1/wCCwPxzj8KeBj8JYpdr69a78AsD+7nHYcfw96/bHWr+DS9LuNQuG2pEhZieAABX8Xv/AAUN+NMvxc+O2qWkzBl0S6uLW3KjAKeaTk/Mc/hX5p4m5z9VwTjGVmz+tfod+HqzriunUqxvTp6vTr0/zPgOaXzpfMAyOhPvTSQCSowT3pyGRRhcf/XpgVmGXHNfxzXdRyc4Pc/3moUaVGKhBaLQfGTnL/N9a/Qb/gnB8dI/gl+0La63qcxWwa2uI2Qltm+TaAdq9+PSvz0IOcDrWlo1w1jqcV0pKlGByOOhzXqZFjp4PHUqjlopI+G8VOFKeb5BjMDL/l5TlFfNH+hxpt6l7apcj+Jd1aKsSQexr42/Yo+Ntp8cPg3a+LkYbvNlh2j5T+62jpk+tfYv+sYGv7rynHxxGHjVj1P+b3ifIK2XZhVwNdWcG0/kWcDrUZVQcZpoOG57UMdx4r02rHznPpdE1FIBgk0tIoKKKKACiiigD//R/v3yKTevrUf3zSlBgA01YTvbQcSu4N+tQHco5GaeeBsHSo5HlVC23npj29amTsrlwZ8dftwfF3Svhb+zz4lka5WK9vdOuYrU7lB80RkjAPU+1fxEeINYvde1e41vUX8y5u3MrPx95jk5xxX7uf8ABY345Q6tq1t8LdIuds2lXjG4RCwJWSHo3bHNfgaWVWCEZL81/J3jFn7xGMjTjtFW/E/2x+gd4ff2Vw7UxuIj79aSkr9Fy6WGlXH7l22/xc112i+CPGniHTrrVtH024ureyiaaeWOMssca5yzEdAMcmuVDqnMgDt2zX9DX7BfwEi8Rfsh+I/EE9tufW9IvrVDtU8gyKMZ5/OvgOFuF546vKkpPRXP6I8Y/FVcK5fTxk4J801Gzdt3/TP543yBu/WlDKvJ5r0T4teEm8A+PNU8LT5VrCUx7Dj29OK85wAu5DkHn6e1eJmlL2UlF7o/VMrzOjmGDhiKduVo/fL/AII4fHOWz8VXfwi1O68qzhtnuIg5UKZJJY1wO+TX9LyPmNSnPrX8HX7LPxB1T4cfG3w7rVnK0Mcmo2iXBDEfuvPQtnHUYHSv7kvhz4v03xx4UtPEmkuJILlSVZc4OGK9+eor+sPCbPPrWB9lPeP4n+KP03/DP+yOIFjqN+Stq32f/BO6bdtyo6ilQ/3hinlscU1mJFfrid3yn8Pt8sRwkUnHSnZWocIDzSMwVTjk07xva5MX/MTB0bkGlyKqN5aDOcCmi6ts8OK56uMoQfLOaT9TSVOVrxVy9SAg9Kp/a4z3HNKtxAG+Vx9KxjmeGbsqiv6oaptrY//S/v1fpTD90VLkYzUZIYioUddQQzkfN/COvrXAfE/xWng7wXqevTHBtLaWUfVELeo9K9DfaByQMetflx/wVM+M8fws+BDG1kD3F7cJblFZd2yWOQZwc8cV5GfZhHDYWpWnskfc+G/C885zvDZbD7ckj+XH9pz4uSfGj4yaz4/uSwF/IpVcFcFECfdycdPWvnpsr8x5PapriZJybnGVckgVEiycSqMY6Dviv4azjGyxVadSXVn/AEf8FZHSyrKqOCgrKmkvuN3w7p82o6ta6fboGMsyA59GYCv7h/2VPhHZ/DD4Fad4FCAoiSE98+axYjOB6+lfy7f8E1vgdF8Zvje2l6pAz2dvZy3IchtokjkiwMr356V/ZdptmtjZpbKOFUAY9q/oDwXyV+xljai30P8ALH6ffiS6+ZUskoy0h7z9en6n8df/AAVF+Df/AArP49X/AIhYAQeIbiaVQpyQI9o4GBjr71+ZXknysIec8Z9K/qi/4LFfBX/hLvhhH8S7aIvL4eic5CscedLEvbj86/lcnTYxWUcg8jpzX5d4o5HLC5jOS2lsf2P9D7jyGccI4ek3edO6kvT/AIGpbsp7m1vUu4TteMhlIOMEHIr+uD/gk78az4++Btl4JumZ7rQoQJWbuZZpWHO4k8ewr+RdgW4zkJ81fr3/AMEjvjivw/8Aivc+D7qURr4hkt4VDFRnYXPG7nv2ru8Lc9+rZhTpN6PRnk/TQ8O45vwtVxcI3nTs18t/wuf1uhwaQYXg1SsphdW6SRkFSo5HTpVtuVz36V/YEfeSZ/hNJOMnFjajaNly/apdhAAbk1XvrlbS3MkhCgDkmubGV6dGm61V6LVh7P2jUT5D/ai+J114U0uLTNLcpcmSN+P7pDZ6HPWviI/HDxevJnP5t/8AFVL+0L40PjHxxJewNjyF8jOQR8jN6V4BKdydMuOT/wDqr/AL6Uv0n83hxPicLllVqEHprY/vnwp8NcLTy2nPExTclqe8/wDC8/GP/Pc/m3/xVepfCLx/4y8ZeLE08znYY3PVuox718ZwIZgB90+9fp/+yN8O4rDw1L4gvoiLlpT5bkEfIyKfofrXR9ErjTizjbiing605Klyzbd3a6Vzg8VcDgMnyypUpxjzXVtO7P/T/v1AAXrTQpzkUcrwe/FRksjY9aTd3oDVtEVtRuFgt2kb+EV/KH/wVs+PM/jj4sweD9FmM+lRWUErKCQomV5VPBA5xX9KH7QnxU0z4TfDPUvF2pHC26hehPLnaOhHc1/C18SfGOqeMvE91rWqXEk7tK6ozsWO3eSBlieOa/EfGfPfY0I4SD1luf6B/QW8L5Zlm0s3qRfLSsk+l+v6HBscoqxDjsKsQLJ5yxseT0FQjPmMz/KU5AHTNei/CfwLqXxA8eWHhnTPnmvHOAzYHAJ68+lfzLhcNOrKNOmr6n+xPEuPo4TA1MRVkoqKer72P6Tf+CPXwU/4Rv4bXPj3UoBHezXM8KsQCTE6xMOQT6elfuQMqoC814T+z14C03wB8MNJ0TT4UhYW0TSBAoBfy1DHgDJ4617mWIz2r+6OF8uhhcDCjBdD/nB8XuMKueZ/iMfUd7yaXotjwv8AaH+GFt8XPhVq/gW7UFNQRFORn7siv0yPSv4cfjV4OfwF8U9f8MTR7Us9QuYU91jlZB0J9K/v4u4/Ot2UHrX8l/8AwVu+CQ8BfGOHxFpEEaWt/bmeZlABMss8hPCgZ+p5r848XsmVTCLERV3Hc/rP6B3iQsvz3+yKs7Ks0ku7en+R+QcZ+TB+8ev0r0z4O+P5fhj8R9M8aWZxJpkwlXBxk4Pfn1rzJCshaZeBiiExqwbqxr+XcnxcqeJUovW5/sHxNk0Mdg6mFqK6aeh/e3+zX8Q4PiN8HPDvikPulvNNtJpRycNJErEZIGete+4UjGfevwW/4I+ftAXHifwjffD/AMRzObi1lhgs0yzKIooTxyxxjA4HFfvKzquPev7o4azNV8HCrc/50PGfgqtkHEGIwNaLj7zauraPUezEmvE/jp4vXwv4EvrqJ8TqgKjkH7wB5wa9qkOELH0r80v2rvHLXutx6JYSsYkR0mUkgbg/pnBr8f8ApIeINDIOHa860knOLSu+tjyfDfh6WYZnTha6TTZ8S6vqH9p3csg4MjlyfcmswkK7Sqc8cilmKysfL45+lEUZV1HU55z6V/y38SZjWzPM6tWrO7lLf5n+j+Bw6o0ORbJHefDjwy/jTxTaeH4uGuiQvQ9FJ7/Sv2w8A6BF4Y8LWulRqFMUUat7lVAJr4G/ZH8AR6hq83ii5jANmyGLp/GrA9R/Kv0ogx5e3AGK/wCgP9n94PLI+HY47Ew/eSu032Z/DnjtxUsZmH1alK8Y7+p//9T+/Bj8ofHtTWIblvzpVbPTkGsTxBqdtoemT6jeELHGpJJ6VjXq+yTa6G1DDzlWjCGreh+H3/BYv44xaH4HX4O2cq+brMQmz8pA8mdScnOf0r+YmSQ7sHnvx6193/8ABQj41ah8YPjxqkFy5MWiXt5aQEkEeWJzjGAOOO9fB4AHyMMnrmv4y8SM++u5jKz0R/v59E/w8jknClDS1Sesvn/wAB81tznDd819f/sZfETwR8I/jNpXxE8bq8kWmyu22NlBIaNl6MQDya+PXjaQ7t21m698U5iCAj/w8Z9fevj8Bm8sLiYzprY/duNOFKWd5fPLK0mozTTt56H9YNh/wV3+ANnAIEs73C8DmDoP+B1oQ/8ABYH4BOu77DfjHYmD/wCOV/JgsgVt7DPYU9ZpFJ3tuzxmv1WPjHi6cVFI/i3E/QF4dlN/vH97P6y5f+CvvwFnQqtnej6mD/45Xxx+17+1P8B/2vfhy/hvRobiDU1mi2NNJEq7IySRhWY96/n581y2AcAda2dE1e90TUI7zT5dvIzgDueeor43xE8UsbjMlxVGkvelCSXrY9rIPoY5PkGKhmuAqS9rSfNHV7rU+8Lr9jjaES1HAIb7zH/2Woj+yA0jMWRvk92/+Jr9CfBHimDxZ4ah1myYMCdhIOfugZrtw8UkY28Z61/kPxP435vgcxqYGE2pROjGeJ2bUJyp1HqtGeB/sRfC+7+CXxq07xO/FtH5u8EnJLRso+8AO9f09adPHcWqTRnO5QfzFfgTp1yba7SRDgoePev2V+BPjSPxr4U/tJnyY3aLrn7qr7D1r/Rn6CX0gKueQllWPnead9T/AD9+lPgq+NxcM3q66Wf6HpHjPXYvD/h+61aY4EEbOc4/hGe9fiR8R9ck8ReMb3Vi4KTzO6/Rjmv0i/a08cHw54Og0u3fc180kMmMcAoevFflPdOrgOrDKjivwv8AaVeMCnj/APVjDz96nyNr/Ek/1J+jxwjJUP7QqL4rpfJi+Yki5xjFbHhzRZNb1K1soQfMupViUe7HA6Vh+WzLsA96+sP2X/AK+LfFo1K8Tatg0U8YOT8yv7EelfwZ9Hvw9lxLxLSwDp3i3f7j9545zyGW5ZWrt7I/RL4NeEz4T8DWOmTjbMsQD+5GexANetxoqg49aqRRCKNQOq9qtxfd+tf9PnBXD0cqyujgaasoxSP80czx8sRiJ1Z7ydz/1f77smMdMetfFf7eHxYg+Gf7Pmvalby7bw2rm3GWUsyle46da+z2yYWlbsD+lfzZf8FlPjWmo61pfw90iQebYSTrcr7PHGw6N/MV8nxnnEcHgZ1JvVqy+Z+3/R54KqcQcUYbDqLcYyUn6L/g2Pwf8Va/feKfEt94gvBma+nknbJJ+Z2LHk89+9c5uyvmS/K3TAonyNxP+sc5GOlPYucO3POMCv4dxlRyrc76n/RHluDjgsNGnTWlg2yqnmuPlboc0xTkcjP1r9H/ANgv9jDS/wBqXxTf2XiM3EFnawxyh438vO6QIcEowNfrx/w5P+Bqn/j91P8A8Ck/+M19zlHhjmGLo/WaK0Z/NnHf0vOF+H8ZPLca26i7dD+WojA5pMjGDX9TJ/4IofAvH/H7qnP/AE9p/wDGart/wRS+BgPF7qf/AIFJ/wDGa9+j4P5lON2kfCw+nbwbL4nI/lxULjPr1pA6r7V/Uon/AARR+BgBJvdT/wDApP8A4zTW/wCCKXwM7Xup/wDgUn/xmud+DmZOMk0hv6dvBrdm5WPzG/Yq8c/b/C8nhK4cyyxCWXLEk8lQOtfc8ZkiAiKDB6nuK9h03/gmR4F+AcF3418F3N7LdCB1kW4nWRPLUb+Asa85HrXkF1BLbzbJOFbr61/jr9MPwox/C2aQxdWOlR6vyPx6r4j5VxHi6mIyluzfUjO5nyBjHGa+6f2U/H0Wkyz+Hrl9sQWSbv1+UdOlfCzSYXdH90cc1v6H4gudDd/I4LKR+B/GvyL6PnivT4UzmePUmnJfLqfE8c8KPNsI8LU0Pbf2lfGj+J/F91aRys9tbuGjGTjlBnAPSvm7ZGI1OfvDNXrrVJL+XzJecnmoXEflkEkZ+79K+Z8buNFxfntbPOb3pJX/AO3UkvwR7HCOTrL8up4Kn9gs6fE0kojJyWOB9T2r9cv2a/A48N+Dbe8vIVjupNwfAGcByRkivzo+DXgOTxz4oSwXOyJDLkHHKMvHQ+tftDp9mkFoiIMbR0+lf6p/s6/B72dCWbYqOqtyv1P5m+kBxc5cuBg99WX+dxK81KowOaYi4yR3qRQR1r/XiUmnyn8ovuf/1v7rvin4xtvAngbV/E939yws57gnIH+rjZu/Hav4h/2ufiwnxq+PGuePLdy1veSxuhJB4ESIeV4PK1/S9/wVY+N5+GnwQbT9LnAm1WR7KVMsuY5YJAenX6Gv5Cp5B5izSfKH6KOnFfzX408Q8844SD0WrP8AWT9n/wCG6pYerxDWhrK8V6f8GxEpUMWPboat6daz395FaWyHzJXCKO5JOKhZkI3sMD0r379mrwHefEH4t6PpdtGZFjuYZXAx91ZFznPbmvxPB4JYvEQpw6n+iPGXElLLMprY6qtIps/qZ/4JkfBGH4f/AAA0PX76EQ6leQOs+4MHIEzEZB9q/T8IO9cP4C8P2Phjw9a6PZRiOKJAFVQABk56Cu7r+6ciy5YXB06CWyR/zf8AiHxNVzfOcRmFR355Nr0b0XyGbB3o2DHNPor1YwS0R8XdkflpjAGKbInyfLU1Nb7tOKUdhS1Vmc54k0saro11pzkETxPHz/tKRX4v/GXwnL4T8b32kgfuo2UKQDg/Ip4z9a/bxl8yMmvzb/bE8Lm2vYNYt4+Zmcu3HZVHNfwB9P3w4p5pwpWzCcOZ0ldW0/I/e/ATiWWDzVYeUrRl+Z8GAIxCY+XuPWp5owTuJ7YqmrFSfrTmdyOea/546OYUfqsqWIhdp6dLH95Rqpx9pbQjjWTcETgE8VYSEzThJDnbxmo4shgx6LzXfeAPDx8W+JoNEgXJnY9AOwz3r6zw44FnxBmFDAwl71SVmutjzM2zH6thp4xaJI/QP9knwAdP8Pv4guIvKlZ3QbgQSpCnI9q+2lU9M1y/grRoNB0C2sYlCbI1BwMZIUDtXUkFa/6kfBHw9o8P8P4fARVpRirn+Z3GGdzzHMKmIqPd6DtrbSAefWnJ055NKpGB70oGK/XXJ81j5ZK2h//X+/P+Cnnxm1/4rfF99E0mKU6RDDbyxq6MG8zayngEjHNflkdE1RciS3kOOnyt/hX9yOs/sbfAzX7v+0NU0vzJMAZ82QdOnesk/sO/s/bjINHzn/prJ/jX4Dn/AIWYjHYqVeU1qj/TDw1+mnk/DeVwyrB4WXJH0ufxAjQ9VbkwSY/3T/hX7Q/8EfvgpJrXxauPG2rRH7HFazRKHyG81WiYHBXGOa/dr/hhv9n4qWOjE/8AbWT/ABr234Y/BnwR8JrJtP8ABtn9lid2cjczctgHk89hWvC/hJLB4mFacrpHmeMX02aXEWSVcrwlKUHJWvoesQwiIBT1FXKhH38Yxj171NX7vCnyq17n+ccpuTuwoooqhBSHGOaWmupYYFAMaoAX6186/tH+Fk13wJdXO3c9tGxX15x7GvonIUbT1qle2kF9btbTrkMMV8bx7wnSzzK6uW1Phmj1sjzKeDxUMRHoz8Cb3RrmOZlCMCpIPB/wqsul3arh0I/A1+2Nx8G/BF1O9zLaZdyWJ3N1PXvVK5+BPw9uV2z2ef8Agbf41/k5xB+zcdfHVMRTq2T7H9T4H6RtKjhlRdNv7j8Vls7hWA29evBr7k/ZE8F2+p383iKZMNYzBRnjO5Pcc19US/s4/C8niwPP/TR/8a9T8L+C9D8H2Qs9Dh8pOOMk9Bgda/Svo9fQXXDOcLH1pc3K002fLcc+Nv8AaeDlhqCcebT/AD6nW7hEofHtipWB2jNChWG1ue+KACW5r/UWlScNLn82u6Yit8wWpQc5qI5DEinp0rfksRGV73P/0P78G2BeaaOm0DipvKXGMmmmFSc5IpqWuopaRtAYAT07dqcxYHc3FSLGFOck0bBjB5+tOUtdAh3Y1TnAbnHepabtFOqbjCiiigAprkhfl5p1IRuGM4osDIyhzuoYKeVp+PelCgDFSoJbDb0GqAajHJ5NS7QOnegoppq97MlJdRh2E59KQ7cfKaeIwDnNLsUHNOKSdkXJkfCjcvJ6VIBzuoKg0pGazSlzXZLY0gdPWnAYGKMc5patX6gf/9kAAP/hCcpodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXA6Q3JlYXRlRGF0ZT0iMjAxNy0wNy0xNFQxNToxMzo1NiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoTWFjaW50b3NoKSIgeG1wOk1vZGlmeURhdGU9IjIwMTctMDctMTRUMTU6MTM6NTYiLz4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8P3hwYWNrZXQgZW5kPSJ3Ij8+AP/iAjRJQ0NfUFJPRklMRQABAQAAAiRhcHBsBAAAAG1u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"

 const avgleIcon = "data:image/png;base64,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"

 const filters = {
   "Time": {
     "全部影片": "a",
     "今日新增": "t",
     "本周新增": "w",
     "本月新增": "m"
   },
   "View": {
     "最新添加": "mr",
     "最多观看": "mv",
     "最多评论": "md",
     "最多喜欢": "tf"
   }
 }
 const filterName = {
   "a": "共计",
   "t": "今日新增",
   "w": "本周新增",
   "m": "本月新增",
   "mr": "Most Recent",
   "mv": "Most Viewed",
   "md": "Most Commented",
   "tr": "Top Rated",
   "tf": "Top Favorites"
 }

 const content = ["影片", "合集", "分类", "收藏夹"]

 const filterView = {
   type: "view",
   props: {
     id: "filterView",
     radius: 7,
     bgcolor: $color("white"),
     borderWidth: 1,
     borderColor: $color("tint")
   },
   views: [{
     type: "list",
     props: {
       id: "filtersT",
       //separatorHidden: true,
       rowHeight: 30,
       bgcolor: $color("white"),
       template: [{
         type: "label",
         props: {
           id: "filterLabel",
           bgcolor: $color("white"),
           font: $font(15),
           align: $align.center
         },
         layout: $layout.fill

       }],

       scrollEnabled: false
     },
     events: {
       didSelect(sender, indexPath, data) {
         $device.taptic(0);
         cacheFilters.Time = filters.Time[data.filterLabel.text];
         $("filterView").remove();
         filterExist = false;
         $("videos").contentOffset = $point(0, 0);
         $cache.set("cacheFilters", cacheFilters);
         page = 0;
         $("videos").data = [];
         if (mode == "Cat") {
           getVideoData();
         } else if (mode == "Search") {
           getVideoData();
         } else {
           $("search").text = "";
           mode = "Videos";
           has_next = true
           getVideoData();
         }
       },

     },
     layout: function(make, view) {
       make.top.inset(0)
       make.left.inset(0)
       make.width.equalTo(100)
       make.height.equalTo(145)
     }
   }, {
     type: "list",
     props: {
       id: "filtersV",
       //separatorHidden: true,
       rowHeight: 30,
       bgcolor: $color("white"),
       template: [{
         type: "label",
         props: {
           id: "filterLabel",
           bgcolor: $color("white"),
           font: $font(15),
           align: $align.center
         },
         layout: $layout.fill

       }],

       scrollEnabled: false
     },
     events: {
       didSelect(sender, indexPath, data) {
         $device.taptic(0);
         cacheFilters.View = filters.View[data.filterLabel.text];
         $("filterView").remove();
         filterExist = false;
         $("videos").contentOffset = $point(0, 0);
         $cache.set("cacheFilters", cacheFilters);
         page = 0;
         $("videos").data = [];
         if (mode == "Cat") {
           getVideoData();
         } else if (mode == "Search") {
           getVideoData();
         } else {
           $("search").text = "";
           mode = "Videos";
           has_next = true
           getVideoData();
         }

       },

     },
     layout: function(make, view) {
       make.top.inset(0)
       make.left.equalTo($("filtersT").right)
       make.right.inset(0)
       make.height.equalTo(145)
     }
   }, ],
   layout: function(make, view) {
     make.top.inset(45)
     make.left.inset(15)
     make.width.equalTo(200)
     make.height.equalTo(0)
   }
 }

 const contentView = {
   type: "view",
   props: {
     id: "contentView",
     radius: 7,
     bgcolor: $color("white"),
     borderWidth: 1,
     borderColor: $color("tint")
   },
   views: [{
     type: "list",
     props: {
       id: "contentList",
       //separatorHidden: true,
       rowHeight: 30,
       bgcolor: $color("white"),
       scrollEnabled: false,
       template: [{
         type: "label",
         props: {
           id: "contentLabel",
           bgcolor: $color("white"),
           font: $font(15),
           align: $align.center
         },
         layout: $layout.fill
       }],
     },
     events: {
       didSelect(sender, indexPath, data) {
         $device.taptic(0);
         $("contentView").remove();
         contentExist = false;
         if($("search"))
           $("search").text = "";
         var c = data.contentLabel.text;
         if (c == "影片") {
           
           cacheContent = "影片";
           $cache.set("cacheContent", cacheContent);
           contentMode = "Videos";
           if (CCExist == true) {
                 $("CCView").remove();
                 $("Avgle").add(VFView);
             
           }

           CCExist = false;
           VFExist = true;
           $("next").hidden = false;
           $("pre").hidden = false;
           $("nextB").hidden = false;
           $("preB").hidden = false;
           $("page").hidden = false;
           mode = "Videos";
           $("videos").contentOffset = $point(0, 0);
           $("videos").data = [];
           page = 0;
           has_next = true
           getVideoData();
         } else if (c == "合集") {
           cacheContent = "合集";
           $cache.set("cacheContent", cacheContent);
           cacheFilters.View = "bw";
           $cache.set("cacheFiltes", cacheFilters)
           contentMode = "Collections";
           if (CCExist == true) {
             
               $("CCView").remove();
               $("Avgle").add(CCView);
             
           } else {
             $("VFView").remove()
             $("Avgle").add(CCView);
           }
           CCExist = true;
           VFExist = false;
           $("CCList").contentOffset = $point(0, 0);
           cpage = -1;
           has_next = true
           $("CCList").data = []
           getCollectionData()
         } else if (c == "分类") {
           cacheContent = "分类";
           $cache.set("cacheContent", cacheContent);
           cacheFilters.View = "bw";
           $cache.set("cacheFiltes", cacheFilters)
           contentMode = "Categories"
           if (CCExist == true) {
             
               $("CCView").remove();
               $("Avgle").add(CCView);
             
           } else {
             $("VFView").remove()
             $("Avgle").add(CCView);
           }
           CCExist = true;
           VFExist = false;
           $("CCList").contentOffset = $point(0, 0);
           $("CCList").data = []
           getCategoryData()
         } else if (c == "收藏夹") {
           delPlayer()
           $ui.loading(false)
           cacheContent = "收藏夹";
           $cache.set("cacheContent", cacheContent);
           contentMode = "Favorites"
           if (CCExist == true) {
             
               $("CCView").remove();
               $("Avgle").add(VFView);
             
           }
           CCExist = false;
           VFExist = true;
           $("next").hidden = true;
           $("pre").hidden = true;
           $("nextB").hidden = true;
           $("preB").hidden = true;
           $("page").hidden = true;
           $("search").text = "";
           $device.taptic(0);
           //sender.super.remove();
           contentExist = false;
           if (LocalFavList.length == 0) {
             cacheContent = "影片"
             $cache.set("cacheContent", cacheContent)
             $ui.alert("请先收藏!")
             contentMode = "Videos";
             return
           }
           $("videos").contentOffset = $point(0, 0);
           $("search").placeholder = "共计 " + formatNum(LocalFavList.length) + " 部收藏"
           $("searchResult").text = "";
           $("videos").data = [];
           LocalData.favorite.map(function(i) {
             $("videos").data = $("videos").data.concat({
               interface: {
                 src: i.image
               },
               title: {
                 text: i.title
               },
               time: {
                 title: i.time,
                 info: i.image
               },
               duration: {
                 text: i.duration
               },
               like: {
                 text: i.like,
                 alpha: 0.7

               },
               hd: {
                 hidden: i.hd
               },
               favorite: {
                 title: "😍",
                 alpha: 1,
                 info: i
               },
               share: {
                 info: { vid: i.vid, name: i.title,vidUrl:i.video_url}
               }
             });
           });

         }
       }
     },
     layout: function(make, view) {
       make.top.inset(0)
       make.left.right.inset(0)
       make.width.equalTo(100)
       make.height.equalTo(120)
     }
   }, {
     type: "button",
     props: {
       id: "pay",
       title: "提示",
       titleColor: $color("white"),
       bgcolor: $color("#e0b741"),
       font: $font("bold", 15)

     },
     layout: function(make, view) {
       make.top.inset(127)
       make.height.equalTo(25)
       make.left.right.inset(10)
     },
     events: {
       tapped(sender) {
         $device.taptic(0);
         $("contentView").remove();
         contentExist = false;
         $ui.menu({
           items: ["使用提示","作者声明"],
           handler: function(title, idx) {
             switch (idx) {
                
              
                 
               case 1:
                 tutorial();
                 break;
               case 2:
                 tutorial2();
             }
           }
         })
       }
     }

   }],
   layout: function(make, view) {
     make.top.inset(45)
     make.right.inset(15)
     make.width.equalTo(100)
     make.height.equalTo(0)
   }
 }

 const template = [{ // Video and Favorite                                                         
   type: "view",
   props: {
     bgcolor: $color("white"),
     radius: 7
   },
   views: [{
     type: "image",
     props: {
       id: "interface",
       radius: 5
     },
     layout: function(make, view) {
       var imgScale = 16 / 9;
       make.top.left.right.inset(10)
       make.height.equalTo(view.width).dividedBy(imgScale)
       //make.bottom.inset(55)
     }
   }, {
     type: "label",
     props: {
       id: "title",
       textColor: $color("#5c98f9"),
       font: $font(15)
     },
     layout: function(make, view) {
       make.top.equalTo($("interface").bottom).offset(5)
       make.left.right.inset(10)
     }
   }, {
     type: "button",
     props: {
       id: "time",
       titleColor: $color("black"),
       font: $font(13),
       bgcolor: $color("clear")
     },
     layout: function(make, view) {
       make.bottom.inset(4)
       make.left.inset(10)
     },
     events: {
       tapped(sender) {
         var preview = /https.*\//g.exec(sender.info) != false ? /https.*\//g.exec(sender.info)[0] + "preview.mp4" : false
         var cell = sender.super.super.super;
         var view = $("videos").runtimeValue();
         var indexPath = view.invoke("indexPathForCell", cell).rawValue();
         play(preview, indexPath, sender.info, "preview")

       }
     }
   }, {
     type: "label",
     props: {
       id: "like",
       textColor: $color("black"),
       font: $font(12),
     },
     layout: function(make, view) {
       make.bottom.inset(10)
       make.right.inset(10)
     }
   }, {
     type: "text",
     props: {
       id: "duration",
       textColor: $color("white"),
       bgcolor: $color("black"),
       alpha: 0.5,
       font: $font(12),
       radius: 3,
       align: $align.left,
       editable: false,
       scrollEnabled: false,
       insets: $insets(1, 1, 2, 1)
     },
     layout: function(make, view) {
       make.top.equalTo($("interface").bottom).offset(-23)
       make.right.equalTo($("interface").right).offset(-5)
     }
   }, {
     type: "text",
     props: {
       id: "hd",
       textColor: $color("black"),
       bgcolor: $color("#fcbc05"),
       text: "HD",
       alpha: 0.8,
       font: $font("bold", 12),
       radius: 3,
       align: $align.center,
       editable: false,
       scrollEnabled: false,
       insets: $insets(0, 0, 0, 0)
     },
     layout: function(make, view) {
       make.top.equalTo($("interface").top).offset(5)
       make.right.equalTo($("interface").right).offset(-5)
     }
   }, {
     type: "button",
     props: {
       id: "favorite",
       bgcolor: $color("clear"),
       //title: "🤔",
       font: $font(13),
     },
     layout: function(make, view) {
       make.top.equalTo($("like").top).offset(-3)
       make.left.equalTo($("time").right).offset(0)
       make.width.equalTo(30)
       make.height.equalTo(20)
     },
     events: {
       tapped(sender) {
         var info = sender.info;
         var cell = sender.super.super.super;
         var view = $("videos").runtimeValue();
         var index = view.invoke("indexPathForCell", cell).rawValue();
         var idx = index.row;
         favButtonTapped(sender, info, idx)
         if (contentMode == "Favorites") {
           $("search").placeholder = "共计 " + formatNum(LocalFavList.length) + " 部收藏";
           $("searchResult").text = "";
         }
       }
     }

   }, {
     type: "button",
     props: {
       id: "share",
       bgcolor: $color("clear"),
       font: $font(12),
       icon: $icon("022", $color("#777777"), $size(16, 16)),
       alpha: 1,
       //inset:$insets(0,0,0,0)
     },
     layout: function(make, view) {
       make.top.equalTo($("favorite").top).offset(2)
       make.right.equalTo($("like").left).offset(0)
       make.width.equalTo(30)
       make.height.equalTo(17)
     },
     events: {
       tapped(sender) {
         var url = "https://avgle.com/video/" + sender.info.vid
         $ui.menu({
           items: ["在 nplayer 中打开", "分享影片名字", "分享帖子链接", "分享影片链接"],
           handler: function(title, idx) {
             if (idx == 0) {
               videoUrlCatch(url, '', '', "nplayer")
             } else if (idx == 1) {
               $share.sheet(sender.info.name)
               //$clipboard.text = sender.info.name
             } else if (idx == 2) {
               $share.sheet(url)
             } else if (idx == 3) {
               $ui.loading(true);
               videoUrlCatch(url, '', '', "share")
             }
           },
         })

       }
     }

   }],
   layout: $layout.fill
 }]

 const templateC = [{ // Catagory and Collection
   type: "view",
   props: {
     bgcolor: $color("white"),
     radius: 7
   },
   views: [{
     type: "image",
     props: {
       id: "interface",
       radius: 5,
       bgcolor: $color("white")
     },
     layout: $layout.fill
   }, {
     type: "label",
     props: {
       id: "bottomLayer",
       textColor: $color("white"),
       bgcolor: $color("black"),
       alpha: 0.5,
     },
     layout: function(make, view) {
       make.left.right.bottom.inset(0)
       make.height.equalTo(30)
     }
   }, {
     type: "label",
     props: {
       id: "CCName",
       textColor: $color("white"),
       font: $font(16),
       alpha: 1,
     },
     layout: function(make, view) {
       make.bottom.inset(5)
       make.left.inset(10)
     }
   }, {
     type: "text",
     props: {
       id: "totalVideos",
       editable: "false",
       textColor: $color("white"),
       bgcolor: $color("#5c98f9"),
       font: $font("bold", 13),
       align: $align.center,
       scrollEnabled: false,
       lines: 1,
       insets: $insets(2, 2, 2, 2),
       radius: 10
     },
     layout: function(make, view) {
       make.bottom.inset(5)
       make.right.inset(10)
     }
   }, {
     type: "text",
     props: {
       id: "totalViews",
       editable: "false",
       textColor: $color("white"),
       bgcolor: $color("#5c98f9"),
       font: $font("bold", 13),
       align: $align.center,
       scrollEnabled: false,
       lines: 1,
       insets: $insets(2, 0, 2, 15),
       radius: 3,
     },
     layout: function(make, view) {
       make.top.inset(5)
       make.left.inset(10)
     }
   }, {
     type: "button",
     props: {
       id: "playButton",
       bgcolor: $color("clear"),
       icon: $icon("049", $color("white"), $size(15, 15)),
       alpha: 1,
     },
     layout: function(make, view) {
       make.top.inset(4)
       make.left.equalTo($("totalViews").right).offset(-18)
     },
     events: {
       tapped(sender) {
         $share.sheet(sender.info)
       }
     }
   }],
   layout: $layout.fill
 }]

 const info = {
   type: "view",
   props: {
     id: "preinfo",
     bgcolor: $color("#dddddd")
   },
   views: [{
     type: "text",
     props: {
       text: "脚本所有内容来自\n\nhttps://www.avgle.com",
       bgcolor: $color("#dddddd"),
       textColor: $color("#aaaaaa"),
       font: $font(12),
       align: $align.center
     },

     layout: function(make, view) {
       make.top.inset(50)
       make.height.equalTo(100)
       make.width.equalTo($device.info.screen.width)
     }
   }, {
     type: "image",
     props: {
       
       radius: 25,
       bgcolor: $color("#dddddd"),
       alpha: 0.8,
       align: $align.center,
     },
     layout: function(make, view) {
       make.size.equalTo($size(50, 50))
       make.top.inset(130)
       make.left.inset(130)
     }

   }, {
     type: "image",
     props: {
       src: avIcon, //"https://i.loli.net/2017/12/22/5a3cd0ff0b781.jpeg",
       radius: 25,
       bgcolor: $color("#dddddd"),
       alpha: 0.8,
       align: $align.center,
     },
     layout: function(make, view) {
       make.size.equalTo($size(50, 50))
       make.top.inset(130)
//       make.right.inset(130)
       make.centerX.equalTo()
     }

   }, {
     type: "text",
     props: {
       id: "loading",
       text: "Loading...",
       bgcolor: $color("#dddddd"),
       textColor: $color("#888888"),
       font: $font(20),
       align: $align.center
     },

     layout: function(make, view) {
       make.top.inset(200)
       make.height.equalTo(100)
       make.width.equalTo($device.info.screen.width)
     }
   }],
   layout: function(make, view) {
     make.top.equalTo($("search").bottom)
     make.left.right.bottom.inset(0)
   }
 }

 const nextPageView = {
   type: "button",
   props: {
     id: "next",
     bgcolor: $color("clear"),
     //icon: $icon("067", $color("#ffffff"), $size(25, 25))
   },
   layout: function(make, view) {
     make.top.bottom.inset(45)
     make.right.inset(0)
     make.width.equalTo(30)
   },
   events: {
     tapped(sender) {
       $ui.animate({
         duration: 0.5,
         animation: function() {
           $("page").alpha = 1
         },
       })
       page++;
       $("videos").data = [];
       getVideoData();
     }
   }
 }

 const prePageView = {
   type: "button",
   props: {
     id: "pre",
     bgcolor: $color("clear"),
     //icon: $icon("067", $color("#ffffff"), $size(25, 25))
   },
   layout: function(make, view) {
     make.top.bottom.inset(45)
     make.left.inset(0)
     make.width.equalTo(30)
   },
   events: {
     tapped(sender) {
       page--;
       has_next = true
       if (page == -1) {
         $ui.toast("已经在首页！", 1);
         page = 0;
         //has_next = false
         return
       }
       $ui.animate({
         duration: 0.5,
         animation: function() {
           $("page").alpha = 1
         },
       })
       $("videos").data = [];
       getVideoData();
     }
   }
 }

 const pageView = {
   type: "input",
   props: {
     id: "page",
     //type: $kbType.number,
     bgcolor: $color("white"),
     placeholder: "页码",
     font: $font(13),
     alpha: 0,
     align: $align.center
   },
   layout: function(make, view) {
     make.bottom.inset(15)
     make.height.equalTo(20)
     make.width.equalTo(88)
     make.centerX.inset(0)
   },
   events: {
     returned(sender) {
       sender.blur()
       if (isNaN(sender.text)) {
         $ui.alert("❌ 请输入数字！")
         return
       }
       if (sender.text < 0 || sender.text > totalPage) {
         $ui.alert("❌ 页码超出范围！")
         return
       }
       page = Math.floor(sender.text);
       $("videos").contentOffset = $point(0, 0);
       $("videos").data = [];
       has_next = true
       getVideoData();
       sender.text = ""
     }
   }
 }

 const nextPageButton = {
   type: "button",
   props: {
     id: "nextB",
     bgcolor: $color("white"),
     title: "下一页→",
     titleColor: $color("black"),
     font: $font(12),
     alpha: 0
   },
   layout: function(make, view) {
     make.bottom.inset(15)
     make.height.equalTo(20)
     make.width.equalTo(88)
     make.right.inset(20)
   },
   events: {
     tapped(sender) {
       page++;
       $("videos").data = [];
       getVideoData();

     }
   }
 }

 const prePageButton = {
   type: "button",
   props: {
     id: "preB",
     bgcolor: $color("white"),
     title: "←上一页",
     titleColor: $color("black"),
     font: $font(12),
     alpha: 0
   },
   layout: function(make, view) {
     make.bottom.inset(15)
     make.height.equalTo(20)
     make.width.equalTo(88)
     make.left.inset(20)
   },
   events: {
     tapped(sender) {
       page--;
       has_next = true
       if (page == -1) {
         $ui.toast("已经在首页！", 1);
         page = 0;
         return
       }
       $("videos").data = [];
       getVideoData();
     }
   }
 }

 const statusView = {
   type: "view",
   props: {
     bgcolor: $color("#dddddd"),
     id: "statusView",
   },
   views: [{
     type: "input",
     props: {
       id: "search",
       bgcolor: $color("#fdfdfd"),
       placeholder: "搜索影片中...",
       font: $font(15),
       clearButtonMode: 0
     },
     layout: function(make, view) {
       make.top.inset(10)
       make.height.equalTo(30)
       make.left.inset(60)
       make.right.inset(30)
     },
     events: {
       didBeginEditing: function(sender) {
         if (filterExist) {
           $("filterView").remove();
           filterExist = false;
         }

         if (contentExist) {
           $("contentView").remove();
           contentExist = false;
         }
         $("search").runtimeValue().invoke("selectAll")
       },
       changed(sender) {
         if (filterExist) {
           $("filterView").remove();
           filterExist = false;
         }
         if (contentExist) {
           $("contentView").remove();
           contentExist = false;
         }
       },
       returned(sender) {
         contentMode = "Videos";
         cacheContent = "影片";
         $cache.set("cacheContent", cacheContent);

         sender.blur();
         
           $ui.pop()
           CCLevel = 1
         
         if (sender.text) {

           mode = "Search";
           var code = codeCorrectify(sender.text);
           if (code !== "none") {
             keyword = code;
             $("search").text = keyword
           } else {
             keyword = sender.text;
           }
           if (CCExist) {
             $("CCView").remove();
             CCExist = false;
             $("Avgle").add(VFView);
             VFExist = true;
             $("search").text = keyword
           }
           page = 0;
           has_next = true
           cacheFilters.Time = "a";
           cacheFilters.View = "bw"
           $cache.set("cacheFilters", cacheFilters)
           getVideoData()
         } else {
           if (CCExist) {
             $("CCView").remove();
             CCExist = false;
             $("Avgle").add(VFView);
             VFExist = true;
           }
           contentMode = "Videos";
           cacheContent = "影片";
           $cache.set("cacheContent", cacheContent);
           mode = "Videos";
           $("videos").contentOffset = $point(0, 0);
           $("videos").data = [];
           page = 0;
           has_next = true
           getVideoData();
         }
       }
     }
   }, {
     type: "button",
     props: {
       id: "filterButton",
       bgcolor: $color("#dddddd"),
       src: avgleIcon //"https://avgle.com/images/logo/logo.png"
     },
     layout: function(make, view) {
       make.top.inset(12)
       make.height.equalTo(25)
       make.width.equalTo(55)
       make.left.inset(0)
     },
     events: {
       tapped(sender) {
         //$ui.action(contentMode)
         $device.taptic(0)
         if (contentExist) {
           $("contentView").remove();
           contentExist = false
         }
         if (filterExist) {
           $("filterView").remove()
           filterExist = false;
           return
         }
         if (contentMode !== "Videos" && CCLevel == 1) {
           if (CCExist) {
             $("CCView").remove();
             CCExist = false
             $("Avgle").add(VFView);
             VFExist = true;
           }
           contentMode = "Videos";
           cacheContent = "影片";
           $cache.set("cacheContent", cacheContent);
           mode = "Videos"
           page = 0;
           has_next = true
           getVideoData();
           $("videos").contentOffset = $point(0, 0);
           //$ui.toast("", 0.1)
           return
         }
         if (CCLevel == 2) {
           if($("VFView"))
             $("VFView").add(filterView)
         } else {
           $("Avgle").add(filterView);
         }
         var data = []
         Object.keys(filters.Time).map(function(i) {
           data.push({
             filterLabel: {
               text: i,
               textColor: cacheFilters.Time == filters.Time[i] ? $color("white") : $color("black"),
               bgcolor: cacheFilters.Time == filters.Time[i] ? $color("tint") : $color("white")
             }
           })
         })
         $("filtersT").data = [{ title: "     时间线", rows: data }]
         data = []
         Object.keys(filters.View).map(function(i) {
           data.push({
             filterLabel: {
               text: i,
               textColor: cacheFilters.View == filters.View[i] ? $color("white") : $color("balck"),
               bgcolor: cacheFilters.View == filters.View[i] ? $color("tint") : $color("white")
             }
           })
         })
         $("filtersV").data = [{ title: "   影片类型", rows: data }]
         filterExist = true;
         $("filterView").updateLayout(function(make) {
           make.height.equalTo(145)
         });
       }
     }

   }, {
     type: "button",
     props: {
       id: "contentButton",
       bgcolor: $color("#dddddd"),
       icon: $icon("067", $color("#ffffff"), $size(25, 25))
     },
     layout: function(make, view) {
       make.top.inset(12)
       make.right.inset(0)
     },
     events: {
       tapped(sender) {
         $device.taptic(0)
         $ui.pop()
         if (filterExist) {
           $("filterView").remove();
           filterExist = false;
         }
         if (contentExist) {
           $("contentView").remove();
           contentExist = false
           return
         }
           if (VFExist == true && CCLevel == 1) {
             $("VFView").add(contentView);
           } else {
             $("CCView").add(contentView)
           }
           CCLevel = 1
         var data = []
         content.map(function(i) {
           data.push({
             contentLabel: {
               text: i,
               textColor: cacheContent == i ? $color("white") : $color("balck"),
               bgcolor: cacheContent == i ? $color("tint") : $color("white")
             }
           })
         })
         $("contentList").data = data;
         contentExist = true
         //$ui.action(data)
         $("contentView").updateLayout(function(make) {
           make.height.equalTo(160)
         });
       }
     }

   }, {
     type: "label",
     props: {
       id: "searchResult",
       font: $font(14),
       textColor: $color("#cccccc"),
       text: ""
     },
     layout: function(make, view) {
       make.right.equalTo($("search").right).offset(-5)
       make.top.equalTo(17)
     }

   }],
   layout: function(make, view) {
     make.top.inset(0)
     make.left.right.inset(15)
     make.height.equalTo(45)
   }

 }
 var scale = 3

 var VFHeight = ($device.info.screen.width - 50) * 16 / 9 / scale + 55
 var CCHeight = ($device.info.screen.width - 50) * 16 / 9 / scale

 const VFView = { // Video and Favorite
   type: "view",
   props: {
     id: "VFView",
     bgcolor: $color("#dddddd"),
     title: "Avgle"
   },
   views: [statusView, info, {
     type: "matrix",
     props: {
       id: "videos",
       itemHeight: VFHeight,
       columns: 1,
       spacing: 15,
       square: false,
       bgcolor: $color("clear"),
       template: template,
     },
     layout: function(make, view) {
       make.left.right.bottom.inset(0)
       make.top.equalTo($("statusView").bottom).offset(0)
     },
     events: {
       didSelect(sender, indexPath, data) {
         if (filterExist) {
           $("filterView").remove();
           filterExist = false;
         }
         if (contentExist) {
           $("contentView").remove();
           contentExist = false;
         }
         if(data.share.info.vidUrl){
           var url = data.share.info.vidUrl
         } else{
           var url = "https://avgle.com/video/" + data.share.info.vid;
         }
        
         if($("playerMode").index == 1){
           avgleWeb(url)
           return
         }
           
         play(url, indexPath, data.interface.src, "video");
       },
       didReachBottom(sender) {
         sender.endFetchingMore();
         //$ui.toast("🙈 已经到底了",1)
         $ui.animate({
           duration: 0.2,
           animation: function() {
             $("preB").alpha = 1;
             $("nextB").alpha = 1;
             $("page").alpha = 1;
           },
         })
         return
       },
       pulled(sender) {
         if (filterExist) {
           $("filterView").remove()
           filterExist = false;
         }
         if (contentExist) {
           $("contentView").remove();
           contentExist = false;
         }
         page = 0;
         has_next = true
         $("videos").data = [];
         if (contentMode == "Favorites" && mode == "Videos") {
           $("search").placeholder = "共计 " + formatNum(LocalData.favorite.length) + " 部收藏";
           $("searchResult").text = "";
           var temp = LocalFavList;
           tempList = [];
           tempData = { "favorite": [] };
           temp.map(function(i) {
             getFavoriteData(i)
           });
           $ui.toast("更新成功！", 1)
         } else {
           getVideoData();
           $ui.toast("更新成功！", 1);
         }
         $("videos").endRefreshing();
       },
       willBeginDragging(sender) {
         startY = sender.contentOffset.y;
         if (filterExist) {
           $("filterView").remove();
           filterExist = false;
         }
         if (contentExist) {
           $("contentView").remove();
           contentExist = false;
         }
         $ui.animate({
           duration: 0.5,
           animation: function() {
             $("preB").alpha = 0;
             $("nextB").alpha = 0;
             $("page").alpha = 0;
           },
         })
       },
       didEndDragging(sender) {
         endY = sender.contentOffset.y;
         if (Math.abs(endY - startY) > 150) {

           delPlayer()
           $ui.loading(false)
         }

       }

     }
   }, {
      type: "tab",
      props: {
        id: "playerMode",
        items: ["内嵌", "网页"],
        tintColor: $color("tint"),
        radius: 5,
        bgcolor: $color("white"),
        hidden: false,
        alpha: 0.8,
        index: $cache.get("playerMode") || 0
      },
      layout: function(make) {
        make.centerX.equalTo()
        make.bottom.inset(40)
        make.height.equalTo(22)
      },
      events: {
        changed(sender) {
          if (sender.index == 0) $cache.set("playerMode",0);
          else $cache.set("playerMode",1);
          
        }
      }
    },nextPageView, prePageView, pageView, nextPageButton, prePageButton],
   layout: $layout.fill
 }

 const CCView = { // category and collection
   type: "view",
   props: {
     id: "CCView",
     bgcolor: $color("#dddddd"),
   },
   views: [statusView, info, {
     type: "matrix",
     props: {
       id: "CCList",
       itemHeight: CCHeight,
       columns: 1,
       spacing: 15,
       square: false,
       bgcolor: $color("clear"),
       template: templateC,
     },
     layout: function(make, view) {
       make.left.right.bottom.inset(0)
       make.top.equalTo($("statusView").bottom).offset(0)
     },
     events: {
       didSelect(sender, indexPath, data) {
         if (filterExist) {
           $("filterView").remove();
           filterExist = false;
         }
         if (contentExist) {
           $("contentView").remove();
           contentExist = false;
         }
         CCLevel = 2
         VFExist = true;
         cacheFilters.Time = "a";
         cacheFilters.View = "bw";
         $cache.set("cacheFilters", cacheFilters);         
         $ui.push({
           type: "view",
           props: {
             bgcolor: $color("#dddddd"),
             title: "Avgle"
           },
           views: [VFView,
           ]
         })
         page = 0;
         has_next = true
         $("videos").data = [];
         $("videos").contentOffset = $point(0, 0);
         if (contentMode == "Categories") {
           //contentMode = "Videos";
           mode = "Cat";
           CHID = data.info;
           var name = /(.*?)・.*/g.exec(data.CCName.text);
           if (!name) {
             catName = data.CCName.text
           } else {
             catName = name[1]
           }
           getVideoData();
         } else if (contentMode == "Collections") {
           //contentMode = "Videos";
           mode = "Search";
           keyword = data.info;
           $("search").text = data.info;
           getVideoData();
         }
       },
       didReachBottom(sender) {
         sender.endFetchingMore();
         if (contentMode == "Collections") {
           getCollectionData();
         } else {
           $ui.toast("🙈 已经到底了")
           return
         }
       },
       pulled(sender) {
         cpage = -1;
         if (filterExist) {
           $("filterView").remove();
           filterExist = false;
         }
         if (contentExist) {
           $("contentView").remove();
           contentExist = false;
         }
         $("search").text = "";
         if (contentMode == "Categories") {
           $("CCList").data = [];
           getCategoryData();
         } else if (contentMode == "Collections") {
           $("CCList").data = [];
           getCollectionData();
         }
         $ui.toast("更新成功！", 0.1);

         $("CCList").endRefreshing();

       },
       willBeginDragging(sender) {
         startY = sender.contentOffset.y;
         if (filterExist) {
           $("filterView").remove();
           filterExist = false;
         }
         if (contentExist) {
           $("contentView").remove();
           contentExist = false;
         }

       },
       didEndDragging(sender) {
         endY = sender.contentOffset.y;
         if (Math.abs(endY - startY) > 180) {

           delPlayer()
           $ui.loading(false)
         }
       }

     }
   }, ],
   layout: $layout.fill
 }

 function getVideoData() {
   delPlayer()
   $ui.loading(true)
   $("loading").text = "Loading..."
   $ui.toast("载入中...", 10)
   if (mode == "Cat") {
     url = "https://api.avgle.com/v1/videos/" + page + "?limit=10&c=" + CHID + "&t=" + cacheFilters.Time + "&o=" + cacheFilters.View;
   } else {
     if (mode == "Search") {
       url = "https://api.avgle.com/v1/search/" + encodeURI(keyword) + "/" + page + "?limit=10&t=" + cacheFilters.Time + "&o=" + cacheFilters.View
     } else {
       url = "https://api.avgle.com/v1/videos/" + page + "?limit=10&t=" + cacheFilters.Time + "&o=" + cacheFilters.View;
     }
   }
   $http.request({
     url: url,
     timeout: 5,
     handler: function(resp) {
       //$ui.action(resp.error)
       //$ui.action(resp.error.indexOf("请求超时"))
       var success = resp.data.success;
       if (!success || !resp.response) {
         $ui.toast("", 0.1)
         $ui.alert("❌ 网络连接出错！");
         return
       }
       var video_num = resp.data.response.total_videos
       if (video_num == 0) {
         $ui.toast("", 0.1)
         $ui.alert("❌ 没有搜索结果！");
         $ui.loading(false);
         $("VFView").remove()
         $("Avgle").add(VFView);
         $("search").text = encodeURI(keyword);
         $("search").placeholder = "重新搜索"
         $("searchResult").text = filterName[cacheFilters.Time] + "找到 0" + " 部影片";
         $("loading").text = ""
         return
       }
       $("videos").data = []
       $("videos").contentOffset = $point(0, 0);
       if (!resp.data.response.has_more) {
         if (has_next == false) {
           $ui.toast("🙈 已经到底了", 1);
           page--;
           $ui.loading(false);
           return
         }
         has_next = false
       }
       var infos = resp.data.response.videos;
       //$ui.action(infos)
       infos.map(function(i) {
         $("videos").data = $("videos").data.concat({
           interface: {
             src: i.preview_url
           },
           title: {
             text: i.title
           },
           time: {
             title: formatTime(i.addtime),
             info: i.preview_url
           },
           duration: {
             text: formatDuration(i.duration)
           },
           like: {
             text: "❤️ " + formatNum(i.likes) + " 🖤 " + formatNum(i.dislikes) + " ▶️ " + formatNum(i.viewnumber),
             alpha: 0.7,
           },
           hd: {
             hidden: i.hd == true ? false : true
           },
           favorite: {
             title: LocalFavList.indexOf(i.vid) > -1 ? "😍" : "🤔",
             alpha: LocalFavList.indexOf(i.vid) > -1 ? 1 : 0.6,
             info: {
               title: i.title,
               image: i.preview_url,
               time: formatTime(i.addtime),
               duration: formatDuration(i.duration),
               like: "❤️ " + i.likes + " 🖤 " + i.dislikes + " ▶️ " + i.viewnumber,
               hd: i.hd == true ? false : true,
               vid: i.vid,
               vidUrl:i.video_url
             }
           },
           share: {
             info: { vid: i.vid, name: i.title,vidUrl:i.video_url}
           }
         })
       })
       $ui.toast("", 0.1);
       $ui.loading(false);
       $("loading").text = ""
       if (mode == "Search") {
         $("searchResult").text = filterName[cacheFilters.Time] + "找到 " + formatNum(video_num) + " 部影片";
         $("search").placeholder = "";
       } else {
         if (mode == "Cat") {
           $("search").placeholder = "#" + catName + " | " + filterName[cacheFilters.Time] + " " + formatNum(video_num) + " 部影片 ";
         } else {
           $("search").placeholder = filterName[cacheFilters.Time] + " " + formatNum(video_num) + " 部影片 ";
         }
         $("searchResult").text = "";
       }
       $("videos").contentOffset = $point(0, 0);
       totalPage = Math.floor(video_num / 10)
       $("page").placeholder = page + " / " + totalPage
     }
   })
 }

 function getFavoriteData(vid) {
   delPlayer()
   url = "https://api.avgle.com/v1/video/" + vid;
   $("searchResult").text = "";
   $http.request({
     url: url,
     handler: function(resp) {
       var success = resp.data.success;
       if (!resp.response) {
         $ui.alert("❌ 网络连接出错！");
         //$ui.toast("",0.1)
         return
       }
       if (!success) {
         $ui.alert(url + "❌ 该影片连接出错！\n请稍候再试。")
         return
       }

       var i = resp.data.response.video;
       var info = {
         title: i.title,
         image: i.preview_url,
         time: formatTime(i.addtime),
         duration: formatDuration(i.duration),
         like: "❤️ " + i.likes + " 🖤 " + i.dislikes + " ▶️ " + i.viewnumber,
         hd: i.hd == true ? false : true,
         vid: i.vid,
         vidUrl:i.video_url
       };
       $("videos").data = $("videos").data.concat({
         interface: {
           src: i.preview_url
         },
         title: {
           text: i.title
         },
         time: {
           title: formatTime(i.addtime),
           info: i.preview_url
         },
         duration: {
           text: formatDuration(i.duration)
         },
         like: {
           text: "❤️ " + i.likes + " 🖤 " + i.dislikes + " ▶️ " + i.viewnumber,
           alpha: 0.7,
         },
         hd: {
           hidden: i.hd == true ? false : true
         },
         favorite: {
           title: "😍",
           alpha: 1,
           info: info
         },
         share: {
           info: { vid: i.vid, name: i.title}
         }
       });
       if (contentMode == "Favorites") {
         tempList.push(i.vid);
         tempData.favorite.push(info)
         if (tempList.length == LocalFavList.length) {
           LocalFavList = tempList;
           LocalData = tempData;
           writeCache();
         }
       };

     }
   })
 }

 function getCollectionData() {
   delPlayer()
   $ui.loading(true)
   $("loading").text = "Loading..."
   $("searchResult").text = "";
   cpage++;
   $http.request({
     url: "https://api.avgle.com/v1/collections/" + cpage + "?limit=10",
     timeout: 5,
     handler: function(resp) {
       var success = resp.data.success;
       if (!success || !resp.response) {
         $ui.alert("❌ 网络连接出错！");
         return
       }
       if (!resp.data.response.has_more && cpage > 0) {
         $ui.toast("🙈 已经到底了", 1);
         $ui.loading(false);
         //return
       }
       var collections = resp.data.response.collections;
       collections.map(function(i) {
         $("CCList").data = $("CCList").data.concat({
           interface: {
             src: i.cover_url
           },
           CCName: {
             text: i.title
           },
           totalVideos: {
             text: i.video_count.toString()
           },
           totalViews: {
             text: formatNum(i.total_views),
             hidden: false,
           },
           playButton: {
             hidden: false,
             info: i.collection_url
           },
           info: i.keyword

         })
       })
       $("search").text = ""
       $("search").placeholder = "共计 " + formatNum(resp.data.response.total_collections) + " 个合集"
       $ui.loading(false)
       $("loading").text = ""
     }
   })

 }

 function getCategoryData() { // category and collection
   delPlayer()
   $ui.loading(true)
   $("loading").text = "Loading..."
   $("searchResult").text = "";
   url = "https://api.avgle.com/v1/categories"
   $http.request({
     url: url,
     timeout: 5,
     handler: function(resp) {
       var success = resp.data.success;
       if (!success || !resp.response) {
         $ui.alert("❌ 网络连接出错！");
         return
       }
       var categories = resp.data.response.categories
       $("CCList").data = []
       categories.map(function(i) {
         $("CCList").data = $("CCList").data.concat({
           interface: {
             src: [i.cover_url.slice(0,8),"static.",i.cover_url.slice(8)].join("")
           },
           CCName: {
             text: i.name
           },
           totalVideos: {
             text: formatNum(i.total_videos)
           },
           totalViews: {

             hidden: true,
           },
           playButton: {
             hidden: true
           },
           info: i.CHID
         })
       })
       $("search").text = ""
       $("search").placeholder = "搜索番号或者名字"
       $ui.loading(false)
       $("loading").text = ""
     }
   })
 }

 function favButtonTapped(sender, info, idx) {
   if (sender.title == "🤔") {
     if ($("player")) {
       sender.title = "😍"
     } else {
       var data = $("videos").data;
       data[idx].favorite.title = "😍";
       data[idx].favorite.alpha = 1;
       $("videos").data = data;
     }
     LocalData.favorite.unshift(info);
     LocalFavList.unshift(info.vid)
     writeCache();
     $ui.toast("😍 已收藏！", 1)
   } else if (sender.title == "😍") {
     if ($("player")) {
       sender.title = "🤔"
     } else {
       var data = $("videos").data;
       data[idx].favorite.title = "🤔";
       data[idx].favorite.alpha = 1;
       $("videos").data = data;
     }
     var idxx = LocalFavList.indexOf(info.vid);
     LocalFavList.splice(idxx, 1);
     LocalData.favorite.splice(idxx, 1);
     writeCache()
     $ui.toast("🤔 已取消！", 1)
   }
 }

 function formatDuration(ns) {
   var mins = Math.floor(ns / 60)
   var hours = mins > 60 ? Math.floor(mins / 60) : 0
   var seconds = Math.floor(((ns / 60) - mins) * 60)
   if (hours > 0) {
     mins = mins - 60 * hours
   }
   mins = mins.toString().length > 1 ? mins : `0${mins}`
   hours = hours.toString().length > 1 ? hours : `0${hours}`
   seconds = seconds.toString().length > 1 ? seconds : `0${seconds}`
   if (hours == "00") {
     return `${mins}:${seconds}`
   } else {
     return `${hours}:${mins}:${seconds}`
   }

 }

 function formatTime(ns) {
   var myTime = Math.floor(new Date() / 1000);
   var timeDiff = myTime - ns
   if (timeDiff / 60 < 60) {
     return Math.floor(timeDiff / 60) + " 分钟前"
   } else if (timeDiff / 3600 < 24) {
     return Math.floor(timeDiff / 3600) + " 小时前"
   } else {
     return Math.floor(timeDiff / 3600 / 24) + " 天前"
   }

 }

 function formatNum(num) {
   var num = (num || 0).toString(),
     result = '';
   while (num.length > 3) {
     result = ',' + num.slice(-3) + result;
     num = num.slice(0, num.length - 3);
   }
   if (num) { result = num + result; }
   return result;
 }

 function writeCache() {
   $file.write({
     data: $data({ string: JSON.stringify(LocalData) }),
     path: LocalDataPath
   })
 }

 // function clipboardDetect() {
 //   var str = $clipboard.text
 //   if (!str || str.length > 200) {
 //     return "none"
 //   } else {
 //     var reg = /[sS][nN][iI][sS][\s\-]?\d{3}|[aA][bB][pP][\s\-]?\d{3}|[iI][pP][zZ][\s\-]?\d{3}|[sS][wW][\s\-]?\d{3}|[jJ][uU][xX][\s\-]?\d{3}|[mM][iI][aA][dD][\s\-]?\d{3}|[mM][iI][dD][eE][\s\-]?\d{3}|[mM][iI][dD][dD][\s\-]?\d{3}|[pP][gG][dD][\s\-]?\d{3}|[sS][tT][aA][rR][\s\-]?\d{3}|[eE][bB][oO][dD][\s\-]?\d{3}|[iI][pP][tT][dD][\s\-]?\d{3}|[cC][hH][nN][\s\-]?\d{3}/g;
 //     var match = str.match(reg);
 //     if (match) {
 //       var detect = /([a-zA-Z]{3,5})[\s\-]?(\d{3,4})/g.exec(match[0])
 //       var keyword = detect[1] + "-" + detect[2]
 //       if(keyword.length > 20){
 //         return "none"
 //       }else{
 //         return keyword
 //       }
 //     } else {
 //       return "none"
 //     }
 //   }
 // }

 function clipboardDetect() {
   let str = ""
   if ($clipboard.text)
     str = $clipboard.text
   var reg1 = /[sS][nN][iI][sS][\s\-]?\d{3}|[aA][bB][pP][\s\-]?\d{3}|[iI][pP][zZ][\s\-]?\d{3}|[sS][wW][\s\-]?\d{3}|[jJ][uU][xX][\s\-]?\d{3}|[mM][iI][aA][dD][\s\-]?\d{3}|[mM][iI][dD][eE][\s\-]?\d{3}|[mM][iI][dD][dD][\s\-]?\d{3}|[pP][gG][dD][\s\-]?\d{3}|[sS][tT][aA][rR][\s\-]?\d{3}|[eE][bB][oO][dD][\s\-]?\d{3}|[iI][pP][tT][dD][\s\-]?\d{3}|[iI][pP][xX][\s\-]?\d{3}/g;
   var reg2 = /[a-zA-Z]{3,5}[\s\-]?\d{3,4}/g;
   var match = str.match(reg1);
   if (match) {
     var detect = /([a-zA-Z]{3,5})[\s\-]?(\d{3,4})/g.exec(match[0])
     var keyword = detect[1] + "-" + detect[2]
     if (keyword.length > 20) {
       return "none"
     } else {
       return keyword
     }
   } else {
     var match = str.match(reg2);
     if (match) {
       var detect = /([a-zA-Z]{3,5})[\s\-]?(\d{3,4})/g.exec(match[0])
       let heyzo = /[Hh][Ee][Yy][Zz][Oo]/g.exec(detect[1])
       if (heyzo) {
         var keyword = detect[1] + " " + detect[2]
       } else {
         var keyword = detect[1] + "-" + detect[2]
       }
       if (keyword.length > 20) {
         return "none"
       } else {
         return keyword
       }
     } else {
       return "none"
     }

   }

 }

 function codeCorrectify(detect) {
   if (!detect) {
     return "none"
   } else {
     var s = /([a-zA-Z]{3,5})[\s\-]?(\d{3,4})/g.exec(detect)
     if (s) {
       return s[1] + "-" + s[2]
     } else {
       return detect
     }
   }

 }

 // async function getInfo(url) {
 //
 //   return new Promise(resolve => {
 //     $('VFView').add({
 //       type: 'web',
 //       props: {
 //         id: 'avgle_web',
 //         url: url,
 //         hidden: true,
 //       },
 //       layout: $layout.fill,
 //       //            layout (make) {
 //       //                make.size.equalTo($size(0, 0));
 //       //            },
 //       events: {
 //         didFinish(sender) {
 //           sender.eval({ script: "setInterval(function(){$('.vjs-big-play-button').click();},10);" });
 //
 //         },
 //         didSendRequest(request) {
 //
 //           if (!/video-url\.php/.test(request.url)) {
 //             return
 //           };
 //           let vInfo = {},
 //             params = request.url.match(/\?(.*)/)[1];
 //
 //           resolve(params);
 //           $('avgle_web').remove();
 //         }
 //       }
 //     });
 //   });
 // }
 //
 function videoUrlCatch(url, indexPath, poster, addPlayer) {
   OriUrl = url
   $ui.toast("影片获取中…", 20);
   let videoUrl = false
   $('VFView').add({
     type: 'web',
     props: {
       id: 'avgle_web',
       url: encodeURI(url),
       hidden: true,
       ua:"Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1"
     },
     layout: $layout.fill,
     //            layout (make) {
     //                make.size.equalTo($size(0, 0));
     //            },
     events: {
       didFinish(sender) {
         sender.eval({ script: "setInterval(function(){$('.vjs-big-play-button').click();},10);" });

       },
       didSendRequest(request) {
         //$ui.alert(request.url)       
         if (!/video-url\.php/.test(request.url)) {        
           return
         }         
         let vInfo = {},
         params = request.url.match(/\?(.*)/)[1];
         $('avgle_web').remove();
         Status = "closed"
         $http.get({
           url: `https://avgle.com/video-url.php?${params}`,
           header:{
  'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1',
},
           timeout: 5,
           handler: function(resp) {
             videoUrl = resp.data.url
             //$ui.alert(videoUrl)
             $http.get({
               url: videoUrl,
               handler: function(resp) {
                 $ui.loading(false);
                 var data = resp.data
                 if(data == "Wrong key"){
                   WrongKey(OriUrl, Status)
                   Status = "Opened"
                   return
                 } else{
                  if (!videoUrl) {
                    $ui.alert("❌ 影片加载失败！")
                    return
                  }
                  $ui.toast("", 0.1)
                  if (typeof addPlayer === 'function') {
                    addPlayer(videoUrl, indexPath, poster);
                  } else if (addPlayer == "share") {
                    $share.sheet(videoUrl)
                  } else {      
                    $app.openURL("nplayer-" + videoUrl)
                  } 
                  return
                 }
               }
             })
           }
         })
       }
     }
   });
   $delay(20, function() {
     if (videoUrl == false) {
      WrongKey(OriUrl,Status)
      return
     }
   })
 }

 function avgleWeb(url) {
   $ui.push({
     props: {},
     views: [{
       type: "web",
       props: {
         id: "web",
         transparent: true,
         showsProgress: true,
         url: encodeURI(url),
         ua:"Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1",
//         script:function(){
//           let cookie = document.cookie
//           $notify("cc",{
//             "cookie":cookie
//           })
//         }

       },
//       events: {
//         cc:function o {
//           $ui.alert(o)      
//           }
//       },    
       layout: $layout.fill,

     }]
   });
 }

 function WrongKey(url,Status){
  if(Status!=="Opened"){
    $ui.toast("",0.1)
    $ui.alert({
      title: "需要验证",
      message: "请先用弹出的网页版完成一次验证播放再返回用脚本进行播放(若碰到连续校验，建议开启网页播放模式)",
      actions: [{
          title: "确定",
          handler: function() {
            return
          }
        },
        {
          title: "Cancel",
          handler: function() {
            return
          }
        }
      ]
    })
    avgleWeb(url)
  }

 }

 //async function videoUrlCatch(url, indexPath, poster, addPlayer){
 //  $ui.toast("影片获取中…", 20);
 //     let params = await getInfo(url);
 //    $http.get({
 //        url: `https://avgle.com/video-url.php?${params}`,
 //       timeout:5,
 //       handler:function(resp){
 //         var videoUrl = resp.data.url
 //         $ui.loading(false);
 //         if (!videoUrl) {
 //           $ui.alert("❌ 影片加载失败！")
 //           return
 //         }
 //         $ui.toast("",0.1)
 //         if (typeof addPlayer === 'function') { 
 //           addPlayer(videoUrl,indexPath, poster);
 //        }else if(addPlayer == "share"){
 //          $share.sheet(videoUrl)
 //        }else {
 ////          $ui.action("dd")        
 //          $app.openURL("nplayer-"+videoUrl)
 //        }
 //       }
 //     })
 //
 //}
 //
 function addPlayer(videoUrl, indexPath, poster) {
   delPlayer()

   $("videos").cell(indexPath).add({
     type: "video",
     props: {
       id: "player",
       src: videoUrl,
       poster: poster,
       ua:"Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1"

     },
     layout: function(make, view) {
       var scale = 16 / 9;
       make.top.left.right.inset(0)
       make.height.equalTo(view.width).dividedBy(scale);
     }
   });
   $delay(0.5, function() {
     $("player").play()
   })
 }

function delPlayer() {
  if ($("player")) {
    $("player").pause();
    $("player").stopLoading();
    $("player").remove();
  }
}

function play(url, indexPath, poster, videoMode) {
   $ui.loading(true);
   if (videoMode == "video") {
     videoUrlCatch(url, indexPath, poster, addPlayer)
   } else if (videoMode == "preview") {
     addPlayer(url, indexPath, poster, videoMode)
   }

 }

 function tutorial() {
   var text = "提示\n- 点击片名左下角影片上传时间预览 8 秒影片，拒绝封杀；\n- 点击片名左下角 🤔 收藏影片；\n- 点击收藏右侧按钮可分享影片名字链接；\n- 点击预览图片或下方标题播放完整影片；\n- 点击屏幕右边缘向下翻页，左边缘向上翻页,或滑至底部出现翻页按钮；\n- 点击左上角 Avgle Logo 可筛选影片；\n- 请合理安排娱乐与工作时间, 劳逸结合，强身健体。"

   // Views
   var hintView = $objc("BaseHintView").invoke("alloc").invoke("initWithText", text)
   var textView = hintView.invoke("subviews").invoke("objectAtIndex", 1).invoke("subviews").invoke("objectAtIndex", 1)

   // Attribute for text
   var string = $objc("NSMutableAttributedString").invoke("alloc").invoke("initWithString", text)
   string.invoke("addAttribute:value:range:", "NSFont", $font("bold", 26), $range(0, 2))
   string.invoke("setAlignment:range:", $align.center, $range(0, 2))

   string.invoke("addAttribute:value:range:", "NSFont", textView.invoke("font"), $range(2, string.invoke("length") - 2))
   string.invoke("addAttribute:value:range:", "NSColor", $color("tint"), $range(text.indexOf("收藏"), 2))
   string.invoke("addAttribute:value:range:", "NSColor", $color("tint"), $range(text.indexOf("分享"), 2))
   string.invoke("addAttribute:value:range:", "NSColor", $color("tint"), $range(text.indexOf("预览"), 2))

   // Paragraph Style
   var para = $objc("NSMutableParagraphStyle").invoke("alloc.init")
   para.invoke("setParagraphSpacing", 15)
   para.invoke("setAlignment", $align.left)

   string.invoke("addAttribute:value:range:", "NSParagraphStyle", para, $range(2, string.invoke("length") - 2))

   // Setup
   textView.invoke("setAttributedText", string)

   // Show View
   hintView.invoke("show")

 }

 function tutorial2() {
  var text = "声明\n\n1. 脚本含成人内容，未满十八岁禁止运行；\n2. 脚本所有内容来自 https://www.avgle.com 与脚本作者无任何关系；\n3. 脚本制作纯属技术交流，无任何商业利益或传播淫秽目的。"

  // Views
  var hintView = $objc("BaseHintView").invoke("alloc").invoke("initWithText", text)
  var textView = hintView.invoke("subviews").invoke("objectAtIndex", 1).invoke("subviews").invoke("objectAtIndex", 1)

  // Attribute for text
  var string = $objc("NSMutableAttributedString").invoke("alloc").invoke("initWithString", text)
  string.invoke("addAttribute:value:range:", "NSFont", $font("bold", 26), $range(0, 2))
  string.invoke("setAlignment:range:", $align.center, $range(0, 2))

  string.invoke("addAttribute:value:range:", "NSFont", textView.invoke("font"), $range(2, string.invoke("length") - 2))
  string.invoke("addAttribute:value:range:", "NSColor", $color("tint"), $range(text.indexOf("任何关系"), 2))
  string.invoke("addAttribute:value:range:", "NSColor", $color("red"), $range(text.indexOf("禁止运行"), 2))
  //string.invoke("addAttribute:value:range:", "NSColor", $color("tint"), $range(text.indexOf("无任何"), 2))

  // Paragraph Style
  var para = $objc("NSMutableParagraphStyle").invoke("alloc.init")
  para.invoke("setParagraphSpacing", 10)
  para.invoke("setAlignment", $align.left)

  string.invoke("addAttribute:value:range:", "NSParagraphStyle", para, $range(2, string.invoke("length") - 2))

  // Setup
  textView.invoke("setAttributedText", string)

  // Show View
  hintView.invoke("show")

}

 const checkAdultView = {
   type: "view",
   props: {
     id: "checkAdult",
     bgcolor: $color("black")
   },
   views: [{
     type: "text",
     props: {
       text: "FBI WARNING",
       textColor: $color("white"),
       font: $font("Helvetica-Bold", 25),
       bgcolor: $color("red"),
       insets: $insets(5, 0, 0, 0),
       align: $align.center,
       editable: false
     },
     layout: function(make, view) {
       make.top.inset(55)
       make.left.right.inset(90)
       make.height.equalTo(40)
     }
   }, {
     type: "text",
     props: {
       text: "Federal law provides severe civil and criminal penalties for the unauthorized reproduction, distribution, or exhibition of copyrighted motion pictures (Title 17, United States Code, Sections 501 and 508). The Federal Bureau of Investigation investigates allegations of criminal copyright infringement (Title 17, United States Code, Section 506).",
       textColor: $color("white"),
       font: $font("bold", 14),
       bgcolor: $color("clear"),
       insets: $insets(0, 0, 0, 0),
       align: $align.justified,
       editable: false
     },
     layout: function(make, view) {
       make.top.inset(120)
       make.left.right.inset(10)
       make.height.equalTo(160)
     }
   }, {
     type: "text",
     props: {
       text: "警告 ⚠️",
       textColor: $color("white"),
       font: $font("Helvetica-Bold", 25),
       bgcolor: $color("red"),
       insets: $insets(5, 0, 0, 0),
       align: $align.center,
       editable: false
     },
     layout: function(make, view) {
       make.top.inset(280)
       make.left.right.inset(130)
       make.height.equalTo(40)
     }
   }, {
     type: "text",
     props: {
       text: "本脚本运行内容包含成人影片、图片，可能会引起你的不适，请谨慎运行。\n未满十八岁，禁止运行。\n\n脚本运行需代理，请将 https://avgle.com 加入代理。\n关于使用说明，请打开脚本代码看首段注释。",
       textColor: $color("white"),
       font: $font("bold", 14),
       bgcolor: $color("clear"),
       insets: $insets(0, 0, 0, 0),
       align: $align.center,
       editable: false
     },
     layout: function(make, view) {
       make.top.inset(350)
       make.left.right.inset(10)
       make.height.equalTo(160)
     }
   }, {
     type: "button",
     props: {
       title: "已满十八岁",
       titleColor: $color("black"),
       bgcolor: $color("white")
     },
     layout: function(make, view) {
       make.left.right.inset(120)
       make.bottom.inset(100)
       make.height.equalTo(30)
     },
     events: {
       tapped: function(sender) {
         $("checkAdult").remove()
         $cache.set("ADULT", true)
       }
     }
   }, {
     type: "button",
     props: {
       title: "未满十八岁",
       titleColor: $color("white"),
       bgcolor: $color("red")
     },
     layout: function(make, view) {
       make.left.right.inset(120)
       make.bottom.inset(40)
       make.height.equalTo(30)
     },
     events: {
       tapped: function(sender) {
         $app.close()
       }
     }
   }],
   layout: $layout.fill
 }

 function initial() {
   var current = $addin.current;
   current.author = "Nicked";
   current.website = "https://t.me/nicked";
   current.version = version;

   if ($file.read(LocalDataPath)) {
     LocalData = JSON.parse($file.read(LocalDataPath).string);
     LocalFavList = LocalData.favorite.map(i => i.vid);

   } else {
     LocalData = { "favorite": [] };
     LocalFavList = [];
   };
   /*cacheFilters = $cache.get("cacheFilters") || { "Time": "a", "View": "bw" };*/
   cacheFilters = { "Time": "a", "View": "bw" };
   cacheContent = "影片";
   contentExist = false;
   filterExist = false;
   contentMode = "Videos";
   //$("Avgle").add(VFView)
   VFExist = true; // videos and favorites
   CCExist = false; // categories and collections 
   page = 0;
   has_next = true;
   $app.autoKeyboardEnabled = true
   CCLevel = 1
   Status = "Closed"
 }


//检测扩展更新
function scriptVersionUpdate() {
  $http.get({
    url:
      "https://raw.githubusercontent.com/nicktimebreak/xteko/master/Avgle/updateInfo",
    handler: function(resp) {
      var afterVersion = resp.data.version;
      var msg = resp.data.msg;
      if (afterVersion > version) {
        $ui.toast("检测到脚本更新,下载中...");
        // var url = "jsbox://install?url=https://raw.githubusercontent.com/nicktimebreak/xteko/master/JavBus/JavBus.js&name=JavBus&icon=icon_087.png&types=1&author=Nicked&website=https://t.me/nicked";
        // $app.openURL(encodeURI(url));
        // $app.close()

        $http.download({
          url:
            "https://raw.githubusercontent.com/nicktimebreak/xteko/master/Avgle/Avgle.js",
          handler: resp => {
            let box = resp.data;
            $addin.save({
              name: $addin.current.name,
              data: box,
              version: afterVersion,
              author: "Nicked",
              icon: "icon_087",
              handler: success => {
                if (success) {
                  $device.taptic(2);
                  $delay(0.2, function() {
                    $device.taptic(2);
                  });

                  $ui.alert({
                    title: "更新已完成",
                    message:"本次更新内容:\n"+msg,
                    actions: [
                      {
                        title: "OK",
                        handler: function() {
                          $addin.restart();
                        }
                      }
                    ]
                  });
                }
              }
            });
          }
        });
      }
    }
  });
}



// function scriptVersionUpdate() {
//   $http.get({
//     url: "https://raw.githubusercontent.com/nicktimebreak/xteko/master/Avgle/updateInfo",
//     handler: function(resp) {
//       var afterVersion = resp.data.version;
//       var msg = resp.data.msg;
//       if (afterVersion > version) {
//         $ui.alert({
//           title: "检测到新的版本！V" + afterVersion,
//           message: "更新后请至扩展列表启动新版本。\n" + msg,
//           actions: [{
//             title: "更新",
//             handler: function() {
//               var url = "jsbox://install?url=https://raw.githubusercontent.com/nicktimebreak/xteko/master/Avgle/Avgle.js&name=Avgle" + afterVersion + "&icon=icon_135.png&types=1&version=" + afterVersion + "&author=Nicked&website=https://t.me/nicked";
//               $app.openURL(encodeURI(url));
//               $app.close()
//             }
//           }, {
//             title: "取消"
//           }]
//         })
//       }
//     }
//   })
// }
//
 function alert() {
   $http.get({
     url: "https://raw.githubusercontent.com/nicktimebreak/xteko/master/Avgle/alert",
     handler: function(resp) {
       var afterTimes = resp.data.times;
       var msg = resp.data.msg;
       if (afterTimes > times) {
         $cache.set("times", afterTimes)
         $ui.alert({
           title: "通知",
           message: msg,
           actions: [{
             title: "好的"
           }]
         })
       }
     }
   })
 }

 function main() {
   if ($cache.get("ADULT")) {
     $("checkAdult").remove()
   }
   initial();
   if ("code" in $context.query) {
     //      $ui.action($context.query)
     mode = "Search";
     $("search").text = $context.query["code"]
     keyword = $context.query["code"]
   } else {
     keyword = clipboardDetect()
     if (keyword == "none") {
       mode = "Videos";
     } else {
       mode = "Search";
       $("search").text = keyword;
     }
   }
   getVideoData();
 }

 function makeUI(title, view1, view2) {
   $ui.render({
     props: {
       title: title,
       bgcolor: $color("#dddddd"),
       id: "Avgle"
     },
     views: [view1, view2],
     layout: $layout.fill
   })
 }

 if ($app.env == $env.today) {
   var name = $addin.current.name.split(".js")
   $app.openURL("jsbox://run?name=" + name[0])
 } else {
   makeUI("Avgle", VFView, checkAdultView)
   LocalDataPath = "drive://Avgle.json";
   scriptVersionUpdate()
   alert()
   main()
 }
