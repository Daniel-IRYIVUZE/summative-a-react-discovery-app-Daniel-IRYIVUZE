#!/bin/bash

# Base URL for the API
BASE_URL="http://localhost:8000/books/"

echo "Adding sample books to the API..."
echo "======================================"

# Book 1: The Great Gatsby
curl "$BASE_URL" \
  -H 'Accept: application/json, text/plain, */*' \
  -H 'Accept-Language: en-US,en;q=0.9,tr;q=0.8,fr;q=0.7' \
  -H 'Connection: keep-alive' \
  -H 'Content-Type: application/json' \
  -H 'Origin: http://localhost:5173' \
  -H 'Referer: http://localhost:5173/' \
  -H 'Sec-Fetch-Dest: empty' \
  -H 'Sec-Fetch-Mode: cors' \
  -H 'Sec-Fetch-Site: same-site' \
  -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36' \
  -H 'sec-ch-ua: "Google Chrome";v="141", "Not?A_Brand";v="8", "Chromium";v="141"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "Windows"' \
  --data-raw '{"title":"The Great Gatsby","author":"F. Scott Fitzgerald","genre":"Fiction","publication_date":"1925-04-10","price":12.99,"rating":4.5,"description":"A classic novel of the Jazz Age, exploring themes of idealism, resistance to change, social upheaval, and excess.","image":"https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400","isbn":"9780743273565","pages":180,"language":"English","publisher":"Scribner","stock":15}'

echo ""
echo "Book 1 added - The Great Gatsby"

# Book 2: To Kill a Mockingbird
curl "$BASE_URL" \
  -H 'Accept: application/json, text/plain, */*' \
  -H 'Accept-Language: en-US,en;q=0.9,tr;q=0.8,fr;q=0.7' \
  -H 'Connection: keep-alive' \
  -H 'Content-Type: application/json' \
  -H 'Origin: http://localhost:5173' \
  -H 'Referer: http://localhost:5173/' \
  -H 'Sec-Fetch-Dest: empty' \
  -H 'Sec-Fetch-Mode: cors' \
  -H 'Sec-Fetch-Site: same-site' \
  -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36' \
  -H 'sec-ch-ua: "Google Chrome";v="141", "Not?A_Brand";v="8", "Chromium";v="141"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "Windows"' \
  --data-raw '{"title":"To Kill a Mockingbird","author":"Harper Lee","genre":"Fiction","publication_date":"1960-07-11","price":14.99,"rating":4.8,"description":"A gripping story of racial injustice and childhood innocence in the American South.","image":"https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400","isbn":"9780061120084","pages":281,"language":"English","publisher":"J.B. Lippincott & Co.","stock":20}'

echo ""
echo "Book 2 added - To Kill a Mockingbird"

# Book 3: 1984
curl "$BASE_URL" \
  -H 'Accept: application/json, text/plain, */*' \
  -H 'Accept-Language: en-US,en;q=0.9,tr;q=0.8,fr;q=0.7' \
  -H 'Connection: keep-alive' \
  -H 'Content-Type: application/json' \
  -H 'Origin: http://localhost:5173' \
  -H 'Referer: http://localhost:5173/' \
  -H 'Sec-Fetch-Dest: empty' \
  -H 'Sec-Fetch-Mode: cors' \
  -H 'Sec-Fetch-Site: same-site' \
  -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36' \
  -H 'sec-ch-ua: "Google Chrome";v="141", "Not?A_Brand";v="8", "Chromium";v="141"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "Windows"' \
  --data-raw '{"title":"1984","author":"George Orwell","genre":"Dystopian","publication_date":"1949-06-08","price":11.99,"rating":4.7,"description":"A dystopian social science fiction novel that examines the consequences of totalitarianism.","image":"https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400","isbn":"9780451524935","pages":328,"language":"English","publisher":"Secker & Warburg","stock":12}'

echo ""
echo "Book 3 added - 1984"

# Book 4: Pride and Prejudice
curl "$BASE_URL" \
  -H 'Accept: application/json, text/plain, */*' \
  -H 'Accept-Language: en-US,en;q=0.9,tr;q=0.8,fr;q=0.7' \
  -H 'Connection: keep-alive' \
  -H 'Content-Type: application/json' \
  -H 'Origin: http://localhost:5173' \
  -H 'Referer: http://localhost:5173/' \
  -H 'Sec-Fetch-Dest: empty' \
  -H 'Sec-Fetch-Mode: cors' \
  -H 'Sec-Fetch-Site: same-site' \
  -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36' \
  -H 'sec-ch-ua: "Google Chrome";v="141", "Not?A_Brand";v="8", "Chromium";v="141"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "Windows"' \
  --data-raw '{"title":"Pride and Prejudice","author":"Jane Austen","genre":"Romance","publication_date":"1813-01-28","price":10.99,"rating":4.6,"description":"A romantic novel of manners that depicts the emotional development of protagonist Elizabeth Bennet.","image":"https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400","isbn":"9780141439518","pages":432,"language":"English","publisher":"T. Egerton","stock":18}'

echo ""
echo "Book 4 added - Pride and Prejudice"

# Book 5: The Hobbit
curl "$BASE_URL" \
  -H 'Accept: application/json, text/plain, */*' \
  -H 'Accept-Language: en-US,en;q=0.9,tr;q=0.8,fr;q=0.7' \
  -H 'Connection: keep-alive' \
  -H 'Content-Type: application/json' \
  -H 'Origin: http://localhost:5173' \
  -H 'Referer: http://localhost:5173/' \
  -H 'Sec-Fetch-Dest: empty' \
  -H 'Sec-Fetch-Mode: cors' \
  -H 'Sec-Fetch-Site: same-site' \
  -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36' \
  -H 'sec-ch-ua: "Google Chrome";v="141", "Not?A_Brand";v="8", "Chromium";v="141"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "Windows"' \
  --data-raw '{"title":"The Hobbit","author":"J.R.R. Tolkien","genre":"Fantasy","publication_date":"1937-09-21","price":16.99,"rating":4.9,"description":"A fantasy novel about the adventures of hobbit Bilbo Baggins in Middle-earth.","image":"https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=400","isbn":"9780547928227","pages":310,"language":"English","publisher":"George Allen & Unwin","stock":25}'

echo ""
echo "Book 5 added - The Hobbit"

# Book 6: Harry Potter and the Sorcerer'\''s Stone
curl "$BASE_URL" \
  -H 'Accept: application/json, text/plain, */*' \
  -H 'Accept-Language: en-US,en;q=0.9,tr;q=0.8,fr;q=0.7' \
  -H 'Connection: keep-alive' \
  -H 'Content-Type: application/json' \
  -H 'Origin: http://localhost:5173' \
  -H 'Referer: http://localhost:5173/' \
  -H 'Sec-Fetch-Dest: empty' \
  -H 'Sec-Fetch-Mode: cors' \
  -H 'Sec-Fetch-Site: same-site' \
  -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36' \
  -H 'sec-ch-ua: "Google Chrome";v="141", "Not?A_Brand";v="8", "Chromium";v="141"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "Windows"' \
  --data-raw '{"title":"Harry Potter and the Sorcerer'\''s Stone","author":"J.K. Rowling","genre":"Fantasy","publication_date":"1997-06-26","price":19.99,"rating":4.9,"description":"The first novel in the Harry Potter series, following Harry Potter'\''s first year at Hogwarts.","image":"https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=400","isbn":"9780590353427","pages":309,"language":"English","publisher":"Bloomsbury","stock":30}'

echo ""
echo "Book 6 added - Harry Potter and the Sorcerer'\''s Stone"

# Book 7: The Catcher in the Rye
curl "$BASE_URL" \
  -H 'Accept: application/json, text/plain, */*' \
  -H 'Accept-Language: en-US,en;q=0.9,tr;q=0.8,fr;q=0.7' \
  -H 'Connection: keep-alive' \
  -H 'Content-Type: application/json' \
  -H 'Origin: http://localhost:5173' \
  -H 'Referer: http://localhost:5173/' \
  -H 'Sec-Fetch-Dest: empty' \
  -H 'Sec-Fetch-Mode: cors' \
  -H 'Sec-Fetch-Site: same-site' \
  -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36' \
  -H 'sec-ch-ua: "Google Chrome";v="141", "Not?A_Brand";v="8", "Chromium";v="141"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "Windows"' \
  --data-raw '{"title":"The Catcher in the Rye","author":"J.D. Salinger","genre":"Fiction","publication_date":"1951-07-16","price":13.99,"rating":4.2,"description":"A controversial novel following teenage protagonist Holden Caulfield'\''s experiences in New York City.","image":"https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400","isbn":"9780316769174","pages":234,"language":"English","publisher":"Little, Brown and Company","stock":8}'

echo ""
echo "Book 7 added - The Catcher in the Rye"

# Book 8: The Lord of the Rings
curl "$BASE_URL" \
  -H 'Accept: application/json, text/plain, */*' \
  -H 'Accept-Language: en-US,en;q=0.9,tr;q=0.8,fr;q=0.7' \
  -H 'Connection: keep-alive' \
  -H 'Content-Type: application/json' \
  -H 'Origin: http://localhost:5173' \
  -H 'Referer: http://localhost:5173/' \
  -H 'Sec-Fetch-Dest: empty' \
  -H 'Sec-Fetch-Mode: cors' \
  -H 'Sec-Fetch-Site: same-site' \
  -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36' \
  -H 'sec-ch-ua: "Google Chrome";v="141", "Not?A_Brand";v="8", "Chromium";v="141"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "Windows"' \
  --data-raw '{"title":"The Lord of the Rings","author":"J.R.R. Tolkien","genre":"Fantasy","publication_date":"1954-07-29","price":24.99,"rating":4.8,"description":"An epic high fantasy novel and one of the best-selling books ever written.","image":"https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=400","isbn":"9780395489314","pages":1178,"language":"English","publisher":"George Allen & Unwin","stock":22}'

echo ""
echo "Book 8 added - The Lord of the Rings"

echo "======================================"
echo "All books have been added successfully!"