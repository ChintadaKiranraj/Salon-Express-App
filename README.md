registraction table:
====================

-- Table: public.registration

-- DROP TABLE IF EXISTS public.registration;

CREATE TABLE IF NOT EXISTS public.registration
(
    email_id character varying COLLATE pg_catalog."default" NOT NULL,
    first_name character varying COLLATE pg_catalog."default",
    last_name character varying COLLATE pg_catalog."default",
    phone_number character varying COLLATE pg_catalog."default",
    password character varying COLLATE pg_catalog."default",
    confirm_password character varying COLLATE pg_catalog."default",
    CONSTRAINT registration_pkey PRIMARY KEY (email_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.registration
    OWNER to postgres;


Bokking Details:
==================================

CREATE TABLE public.booking_details (
    id SERIAL PRIMARY KEY NOT NULL,
	name VARCHAR(255),
	date DATE,
	time TIMESTAMP WITHOUT TIME ZONE,
	status VARCHAR(255)
)



INSERT INTO public.locations(locationname)
VALUES 
    ('Gachibowli'),
    ('Shamshabad'),
    ('Kukatpally'),
    ('Mallapur'),
    ('Hi-Tech City'),
    ('Habsiguda'),
    ('Jubilee Hills'),
    ('Secunderabad'),
    ('Banjara Hills'),
    ('Manikonda'),
    ('Uppal Kalan'),
    ('Ameerpet'),
    ('Shamirpet'),
    ('Sainikpuri'),
    ('Srinagar Colony'),
    ('Quthbullapur'),
    ('A C Guards'),
    ('AS Roa Nagar'),
    ('Abids Road'),
    ('Adarsh Nagar'),
    ('Adikmet'),
    ('Afzalgunj'),
    ('Agapura'),
    ('Ahmed Nagar'),
    ('Akbar Road'),
    ('Alexander Road'),
    ('Aliabad'),
    ('Alwal'),
    ('Amberpet'),
    ('Anand Bagh'),
    ('Ashok Nagar'),
    ('Asif Nagar'),
    ('Attapur'),
    ('Attapur Ring Road'),
    ('Auto Nagar'),
    ('Azamabad'),
    ('Azampura Masjid'),
    ('Baber Bagh'),
    ('Bachpally'),
    ('Badichowdi'),
    ('Bagh Amberpet'),
    ('Bagh Lingampally'),
    ('Bahadurpura'),
    ('Bahadurpurpally'),
    ('Bairamalguda'),
    ('Bakaram'),
    ('Bala Nagar'),
    ('Balapur'),
    ('Balkampet'),
    ('Bandimet'),
    ('Bandlaguda'),
    ('Bank Street'),
    ('Bansilal Pet'),
    ('Bansilalpet'),
    ('Bapuji Nagar'),
    ('Barkas'),
    ('Barkatpura'),
    ('Basheerbagh'),
    ('Bazarghat'),
    ('Begum Bazar'),
    ('Bhagya Nagar Colony'),
    ('Bharat Nagar'),
    ('Bhel'),
    ('Bholakpur'),
    ('Bk Guda'),
    ('Bod Uppal'),
    ('Boggulakunta'),
    ('Bolaram'),
    ('Borabanda'),
    ('Boudha Nagar'),
    ('Bowenpally'),
    ('Boyiguda'),
    ('Chaderghat'),
    ('Chaitanyapuri'),
    ('Champapet'),
    ('Champapet X Road'),
    ('Chanchalguda'),
    ('Chanda Nagar'),
    ('Chandrayanagutta'),
    ('Chandrayangutta'),
    ('Chappel Bazar'),
    ('Chappel Road'),
    ('Char Kaman'),
    ('Charkaman'),
    ('Charlapally'),
    ('Charminar'),
    ('Chatta Bazar'),
    ('Cherlapally'),
    ('Chikkadpally'),
    ('Chilkalguda'),
    ('Chintal'),
    ('Chintal Basti'),
    ('Chintalkunta'),
    ('Chirag Ali Lane'),
    ('Chudi Bazar');

'

CREATE TABLE salon_sub_details (
    id SERIAL PRIMARY KEY,
    service_id INT REFERENCES salonservices(serviceid),
    type VARCHAR(255),
    price DECIMAL(10, 2),
    image VARCHAR(255),
    rating DECIMAL(3, 1),
    description TEXT
);
INSERT INTO salon_sub_details (service_id, type, price, image, rating, description)
VALUES
    (14, 'Basic Facial', 40.00, 'basic_facial.jpg', 4.5, 'Enjoy a refreshing basic facial treatment to cleanse and nourish your skin.'),
    (14, 'Deep Cleansing Facial', 60.00, 'deep_cleansing_facial.jpg', 4.7, 'Purify your skin with a deep cleansing facial, perfect for removing impurities and unclogging pores.'),
    (14, 'Anti-Aging Facial', 80.00, 'anti_aging_facial.jpg', 4.8, 'Combat signs of aging with our anti-aging facial, designed to rejuvenate and firm the skin.'),
    (14, 'Hydrating Facial', 50.00, 'hydrating_facial.jpg', 4.6, 'Restore moisture and hydration to your skin with our hydrating facial, leaving it soft and supple.'),
    (14, 'Acne Treatment Facial', 55.00, 'acne_treatment_facial.jpg', 4.7, 'Target acne-prone skin with our specialized acne treatment facial, featuring gentle yet effective ingredients to reduce breakouts and inflammation.'),
    (14, 'Brightening Facial', 70.00, 'brightening_facial.jpg', 4.8, 'Achieve a radiant complexion with our brightening facial, designed to fade dark spots and even out skin tone.');


    INSERT INTO salon_sub_details (service_id, type, price, image, rating, description)
VALUES
    (16, 'Swedish Massage', 60.00, 'swedish_massage.jpg', 4.6, 'Relax and unwind with a soothing Swedish massage, known for its gentle, flowing strokes and overall relaxation benefits.'),
    (16, 'Deep Tissue Massage', 70.00, 'deep_tissue_massage.jpg', 4.8, 'Target deep-seated muscle tension with our deep tissue massage, designed to alleviate chronic pain and improve flexibility.'),
    (16, 'Hot Stone Massage', 80.00, 'hot_stone_massage.jpg', 4.7, 'Experience ultimate relaxation with our hot stone massage, using heated stones to deeply relax muscles and melt away tension.'),
    (16, 'Aromatherapy Massage', 65.00, 'aromatherapy_massage.jpg', 4.5, 'Indulge your senses with an aromatherapy massage, combining the benefits of massage therapy with essential oils to promote relaxation and emotional well-being.'),
    (16, 'Sports Massage', 75.00, 'sports_massage.jpg', 4.7, 'Enhance athletic performance and prevent injury with our sports massage, tailored to address specific muscle groups and promote recovery.'),
    (16, 'Thai Massage', 70.00, 'thai_massage.jpg', 4.9, 'Experience the ancient healing art of Thai massage, incorporating stretching and compression techniques to improve flexibility and balance.');


    -------------
    INSERT INTO salon_sub_details (service_id, type, price, image, rating, description)
VALUES
    (3, 'Full Highlights', 120.00, 'full_highlights.jpg', 4.7, 'Transform your look with full highlights, adding brightness and dimension to your hair with strategically placed color throughout.'),
    (3, 'Balayage', 150.00, 'balayage.jpg', 4.8, 'Achieve a sun-kissed, natural-looking hair color with balayage, a freehand painting technique that creates soft, seamless highlights.'),
    (3, 'Ombre', 130.00, 'ombre.jpg', 4.6, 'Make a statement with ombre hair color, featuring a gradient effect that transitions from darker roots to lighter ends for a bold and trendy look.'),
    (3, 'Root Touch-Up', 80.00, 'root_touch_up.jpg', 4.5, 'Keep your hair color looking fresh with a root touch-up service, targeting regrowth at the roots to maintain a seamless color appearance.'),
    (3, 'Fashion Colors', 160.00, 'fashion_colors.jpg', 4.9, 'Express your individual style with fashion colors, vibrant and unconventional shades that allow you to stand out and make a statement.'),
    (3, 'Color Correction', 200.00, 'color_correction.jpg', 4.7, 'Correct previous color mishaps and achieve your desired hair color with our color correction service, expertly formulated to address uneven or unwanted tones.');
    ------------------
    INSERT INTO salon_sub_details (service_id, type, price, image, rating, description)
VALUES
    (6, 'Keratin Treatment', 180.00, 'keratin_treatment.jpg', 4.8, 'Smooth and straighten your hair with a keratin treatment, reducing frizz and improving manageability for sleek, shiny locks.'),
    (6, 'Japanese Hair Straightening', 200.00, 'japanese_straightening.jpg', 4.7, 'Achieve permanently straight hair with Japanese hair straightening, a chemical treatment that reshapes hair bonds for smooth, straight results.'),
    (6, 'Brazilian Blowout', 160.00, 'brazilian_blowout.jpg', 4.6, 'Revitalize your hair with a Brazilian blowout, a customizable smoothing treatment that eliminates frizz and enhances shine for up to 12 weeks.'),
    (6, 'Hair Relaxer', 150.00, 'hair_relaxer.jpg', 4.5, 'Relax tight curls or waves with a hair relaxer treatment, which chemically alters the hair structure to loosen curls and achieve a straighter look.'),
    (6, 'Thermal Reconditioning', 220.00, 'thermal_reconditioning.jpg', 4.9, 'Experience long-lasting straightening with thermal reconditioning, a heat-activated treatment that permanently straightens hair while maintaining its health and integrity.');




    ----------------------------------new salon_servicess_table----------------
    CREATE TABLE salon_services (
    service_id SERIAL PRIMARY KEY,
    service_name VARCHAR(255) NOT NULL,
    service_avatar VARCHAR(255),
    service_description TEXT
);

1>INSERT INTO main_services (service_name, service_avatar, service_description)
VALUES
    ('Hair Services', 'hair_avatar.jpg', 'Transform your hair with our comprehensive range of services, including cuts, color, styling, and treatments, to achieve your desired look and maintain healthy, beautiful hair.'),
    ('Facial Services', 'facial_avatar.jpg', 'Revitalize your skin with our facial services, tailored to cleanse, exfoliate, and hydrate your skin for a fresh, glowing complexion. Our skilled estheticians use high-quality products and advanced techniques to address your unique skincare needs.'),
    ('Massage Services', 'massage_avatar.jpg', 'Relax and rejuvenate your body and mind with our massage services, designed to reduce stress, alleviate tension, and promote overall well-being. Choose from a variety of massage techniques, including Swedish, deep tissue, and hot stone, to customize your experience.'),
    ('Skin Services', 'skin_avatar.jpg', 'Achieve healthy, radiant skin with our specialized skin services, targeting concerns such as acne, aging, and hyperpigmentation. Our experienced estheticians utilize innovative treatments and technologies to address your skincare goals and enhance your natural beauty.'),
    ('Makeup Services', 'makeup_avatar.jpg', 'Enhance your natural beauty and express your individual style with our professional makeup services. Whether you're looking for a natural daytime look or a glamorous evening makeup, our talented makeup artists will create a customized look to suit any occasion.'),
    ('Nail Services', 'nail_avatar.jpg', 'Pamper your hands and feet with our luxurious nail services, designed to beautify and rejuvenate your nails. From classic manicures and pedicures to gel polish and nail art, our skilled technicians will ensure your nails look flawless and polished.');

-----------------------------nail services--------------------------

INSERT INTO salon_sub_details (service_id, type, price, image, rating, description)
VALUES
    (6, 'French Pedicure', 50.00, 'french_pedicure.jpg', 4.5, 'Indulge in a classic French pedicure, featuring white tips and a sheer pink base for a sophisticated and timeless look.'),
    (6, 'Spa Pedicure', 60.00, 'spa_pedicure.jpg', 4.7, 'Treat your feet to a relaxing spa pedicure, including a foot soak, exfoliation, massage, nail care, and polish application for revitalized and pampered feet.'),
    (6, 'Gel Pedicure', 70.00, 'gel_pedicure.jpg', 4.8, 'Experience long-lasting color and shine with our gel pedicure service. Our skilled technicians will expertly apply gel polish, ensuring your toenails remain chip-free and glossy for weeks.'),
    (6, 'Nail Repair', 15.00, 'nail_repair.jpg', 4.3, 'Restore the beauty of damaged nails with our nail repair service. Our technicians will expertly repair cracks, chips, or breaks, leaving your nails looking flawless and strong.'),
    (6, 'Nail Soak-Off', 20.00, 'nail_soak_off.jpg', 4.2, 'Gently remove gel or acrylic nails with our nail soak-off service. Our technicians will safely dissolve and remove artificial nail enhancements, leaving your natural nails healthy and undamaged.'),
    (6, 'Paraffin Hand Treatment', 25.00, 'paraffin_hand_treatment.jpg', 4.6, 'Indulge in a luxurious paraffin hand treatment, designed to moisturize and soften your hands. This warm wax treatment will soothe tired muscles and leave your skin feeling silky smooth.');


--------------mackeup servicess-----------------
INSERT INTO salon_sub_details (service_id, type, price, image, rating, description)
VALUES
    (5, 'Natural Makeup Look', 50.00, 'natural_makeup.jpg', 4.7, 'Enhance your features with a natural makeup look, perfect for everyday wear. Our makeup artists will create a fresh and effortless look that enhances your natural beauty.'),
    (5, 'Glamorous Evening Makeup', 80.00, 'evening_makeup.jpg', 4.8, 'Get ready for a night out with our glamorous evening makeup service. Our skilled makeup artists will create a stunning and sophisticated look that complements your style and enhances your features.'),
    (5, 'Bridal Makeup Package', 150.00, 'bridal_makeup.jpg', 4.9, 'Look radiant on your special day with our bridal makeup package. Our experienced makeup artists will work with you to create a customized bridal look that enhances your natural beauty and complements your bridal style.'),
    (5, 'Special Occasion Makeup', 70.00, 'special_occasion_makeup.jpg', 4.6, 'Make a statement at your next special occasion with our special occasion makeup service. Whether it s a prom, graduation, or party, our talented makeup artists will create a flawless and memorable look for you.'),
    (5, 'Makeup Consultation', 30.00, 'makeup_consultation.jpg', 4.5, 'Discover the perfect makeup routine for your skin type and preferences with our makeup consultation service. Our knowledgeable makeup artists will provide personalized recommendations and tips to help you achieve your desired look.'),
    (5, 'Halloween Makeup', 100.00, 'halloween_makeup.jpg', 4.7, 'Transform into your favorite character or creature with our Halloween makeup service. Our skilled makeup artists will bring your costume to life with intricate and creative makeup designs for a memorable Halloween look.');



    -----------------facial   servicesss------
    INSERT INTO salon_sub_details (service_id, type, price, image, rating, description)
VALUES
    (4, 'Deep Cleansing Facial', 80.00, 'deep_cleansing_facial.jpg', 4.8, 'Purify and rejuvenate your skin with our deep cleansing facial. Our estheticians will thoroughly cleanse, exfoliate, and extract impurities to reveal a clear, radiant complexion.'),
    (4, 'Anti-Aging Facial', 100.00, 'anti_aging_facial.jpg', 4.7, 'Turn back the clock with our anti-aging facial, designed to target fine lines, wrinkles, and other signs of aging. Our advanced skincare treatments will firm, tone, and rejuvenate your skin for a more youthful appearance.'),
    (4, 'Acne Treatment', 70.00, 'acne_treatment.jpg', 4.5, 'Combat acne and breakouts with our specialized acne treatment. Our estheticians will customize a treatment plan to address your specific skin concerns and help you achieve clear, blemish-free skin.'),
    (4, 'Hydrating Facial', 60.00, 'hydrating_facial.jpg', 4.6, 'Restore moisture and hydration to dry, dehydrated skin with our hydrating facial. Our nourishing treatments will replenish lost moisture, leaving your skin soft, supple, and glowing.'),
    (4, 'Chemical Peel', 120.00, 'chemical_peel.jpg', 4.9, 'Reveal smoother, brighter skin with our chemical peel treatment. Our skincare experts will apply a customized peel solution to exfoliate dead skin cells and improve texture, tone, and clarity.'),
    (4, 'Microdermabrasion', 90.00, 'microdermabrasion.jpg', 4.6, 'Renew your skin s surface with our microdermabrasion treatment. This non-invasive exfoliation method will minimize the appearance of fine lines, wrinkles, and pores, leaving your skin smooth and radiant.');

