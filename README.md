L910-Framework

Вариант 6 — Бассейн 🏊

Сущности:
visitors.json — посетители (string: name, number: age, boolean: hasLocker, Date: lastVisit, Array: favoritePools)
coaches.json — тренеры (string: name, number: salary, boolean: isActive, Date: hireDate, Array: certifications)

Маршруты:
GET /pool/visitors
GET /pool/visitors/:id
POST /pool/visitors
PUT /pool/visitors/:id
PATCH /pool/visitors/:id
DELETE /pool/visitors/:id

GET /pool/coaches
GET /pool/coaches/:id
POST /pool/coaches
PUT /pool/coaches/:id
PATCH /pool/coaches/:id
DELETE /pool/coaches/:id
