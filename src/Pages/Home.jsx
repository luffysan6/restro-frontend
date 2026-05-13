import { useState } from "react";
import NavbarComp from "../Components/Navbar";
import "../index.css";

const Home = () => {
  const [dishes, setdishes] = useState([
    {
      name: "Explosive Paneer Wrap",
      desc: "Fiery paneer tikka, smashed avocado, raw onions, jalapeños, chaos sauce — all crammed into a thick flour wrap.",
      price: "₹249",
      emoji: "🌯",
      tags: ["hot", "veg"],
      color: "card-c1",
    },
    {
      name: "Neon Burger Stack",
      desc: "Double smashed patty, cheddar waterfall, pickled red onions, sriracha mayo on a charcoal bun. It glows.",
      price: "₹349",
      emoji: "🍔",
      tags: ["pop", "hot"],
      color: "card-c2",
    },
    {
      name: "Street Style Chaos Fries",
      desc: "Thick-cut fries drowned in cheese sauce, green chutney, sev, chopped chillies, and our signature masala dust.",
      price: "₹179",
      emoji: "🍟",
      tags: ["new", "pop"],
      color: "card-c3",
    },
    {
      name: "Angry Chicken Bowl",
      desc: "Pulled spice chicken over smoked rice, topped with raw slaw, pickled carrots and a dangerously red sauce.",
      price: "₹299",
      emoji: "🍗",
      tags: ["hot", "pop"],
      color: "card-c4",
    },
    {
      name: "Midnight Mutton Wrap",
      desc: "Slow-cooked mutton shreds, caramelised onions, fresh herbs, chilli oil — a 2AM dream wrapped in coal-baked bread.",
      price: "₹319",
      emoji: "🥙",
      tags: ["new"],
      color: "card-c5",
    },
    {
      name: "Raw Mango Fire Bowl",
      desc: "Chilled raw mango noodles, toasted peanuts, cucumber ribbons, lime, and enough chilli to remember your decisions.",
      price: "₹229",
      emoji: "🍜",
      tags: ["veg", "new"],
      color: "card-c6",
    },
  ]);
  let [currentDish, setcurrentDish] = useState(0);
  let [qty, setqty] = useState(1);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const tagMap = {
    hot: "tag-hot",
    new: "tag-new",
    pop: "tag-pop",
    veg: "tag-veg",
  };
  const tagLabel = {
    hot: "🌶 HOT",
    new: "✦ NEW",
    pop: "★ POPULAR",
    veg: "🌿 VEG",
  };

  //   function renderMenu() {
  //     const g = document.getElementById("menuGrid");
  //     g.innerHTML = dishes
  //       .map(
  //         (d, i) => `
  //     <div class="dish-card ${d.color}" onClick={openDishModal(${i})}>
  //       <div class="dish-card-img">
  //         <span class="price-tag">${d.price}</span>
  //         ${d.emoji}
  //       </div>
  //       <div class="dish-card-body">
  //         <div class="dish-name">${d.name}</div>
  //         <div class="dish-desc">${d.desc}</div>
  //         <div class="dish-tags">
  //           ${d.tags.map((t) => `<span class="tag ${tagMap[t]}">${tagLabel[t]}</span>`).join("")}
  //         </div>
  //       </div>
  //     </div>
  //   `,
  //       )
  //       .join("");
  //   }

  function openDishModal(i) {
    setcurrentDish(i);
    setqty(1);
    setIsOrderOpen(true);
  }

  function closeModal(type) {
    if (type === "order") setIsOrderOpen(false);
    if (type === "success") setIsSuccessOpen(false);
  }

  function confirmOrder() {
    setIsOrderOpen(false);
    setTimeout(() => setIsSuccessOpen(true), 150);
  }

  function changeQty(d) {
    setqty(Math.max(1, Math.min(10, qty + d)));
    document.getElementById("qtyNum").textContent = qty;
  }

  function openOrderModal(e) {
    e.preventDefault();
    openDishModal(1); // default: burger
  }

  //   function openModal(id) {
  //     document.getElementById(id).classList.add("open");
  //   }

  //   function closeModal(id) {
  //     document.getElementById(id).classList.remove("open");
  //   }

  //   function confirmOrder() {
  //     closeModal("orderModal");
  //     setTimeout(() => openModal("successModal"), 150);
  //   }

  // Close modal on overlay click
  document.querySelectorAll(".modal-overlay").forEach((el) => {
    el.addEventListener("click", function (e) {
      if (e.target === this) closeModal(this.id);
    });
  });

  // Scroll reveal
  function revealOnScroll() {
    document.querySelectorAll(".reveal").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight - 60) el.classList.add("visible");
    });
  }
  window.addEventListener("scroll", revealOnScroll);

  //   function handleFormSubmit(e) {
  //     e.preventDefault();
  //     const btn = e.target;
  //     btn.textContent = "SENT! ✓";
  //     btn.style.background = "var(--neon)";
  //     btn.style.color = "var(--black)";
  //     btn.style.borderColor = "var(--neon)";
  //     setTimeout(() => {
  //       btn.textContent = "SEND IT →";
  //       btn.style.background = "var(--black)";
  //       btn.style.color = "var(--yellow)";
  //       btn.style.borderColor = "var(--black)";
  //     }, 2500);
  //   }

  //   renderMenu();
  revealOnScroll();
  return (
    <>
      <NavbarComp />
      {/* <!-- HERO --> */}
      <section id="hero">
        <div className="hero-left">
          <span className="hero-tag">🔥 Delhi's Most Chaotic Kitchen</span>
          <h1 className="hero-h1">
            EAT
            <br />
            LOUD.
            <br />
            <span className="accent">LIVE</span>
            <br />
            RAW.
          </h1>
          <p className="hero-sub">
            No frills. No apologies. Just food that hits like a freight train.
            Foody Junction doesn't do subtle — we do LOUD, messy,
            unapologetically delicious.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <button
              className="btn btn-primary"
              onClick={() => openOrderModal(event)}
            >
              ORDER NOW →
            </button>
            <a href="#menu" className="btn btn-secondary">
              VIEW MENU
            </a>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-noise"></div>
          <div className="hero-img-wrap">
            <div className="hero-img-shadow"></div>
            <div className="hero-img-box">🍔</div>
            <div className="hero-badge">
              OPEN NOW
              <br />
              12PM–11PM
            </div>
          </div>
        </div>
        <div className="hero-ticker">
          <div className="ticker-inner">
            <span>🔥 FREE DELIVERY ABOVE ₹499</span>
            <span>⚡ NEW: MEGA COMBO DEAL</span>
            <span>🌶️ EXTRA HOT AVAILABLE</span>
            <span>🎉 WEEKEND SPECIAL MENU</span>
            <span>🔥 FREE DELIVERY ABOVE ₹499</span>
            <span>⚡ NEW: MEGA COMBO DEAL</span>
            <span>🌶️ EXTRA HOT AVAILABLE</span>
            <span>🎉 WEEKEND SPECIAL MENU</span>
          </div>
        </div>
      </section>

      {/* <!-- MENU --> */}
      <section id="menu">
        <div className="menu-header">
          <div>
            <span className="section-label">FEATURED DISHES</span>
            <h2 className="section-title">
              PICK YOUR
              <br />
              POISON.
            </h2>
          </div>
          <a href="#" className="btn btn-red" style={{ alignSelf: "flex-end" }}>
            FULL MENU →
          </a>
        </div>
        <div className="menu-grid">
          {dishes.map((d, i) => (
            <div
              key={i}
              className={`dish-card ${d.color}`}
              onClick={() => openDishModal(i)}
            >
              <div className="dish-card-img">
                <span className="price-tag">{d.price}</span>
                {d.emoji}
              </div>

              <div className="dish-card-body">
                <div className="dish-name">{d.name}</div>
                <div className="dish-desc">{d.desc}</div>

                <div className="dish-tags">
                  {d.tags.map((t, idx) => (
                    <span key={idx} className={`tag ${tagMap[t]}`}>
                      {tagLabel[t]}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* <!-- ABOUT --> */}
      <section id="about">
        <div className="about-grid">
          <div className="about-left reveal">
            <span
              className="section-label"
              style={{ background: "var(--yellow)", color: "var(--black)" }}
            >
              WHO WE ARE
            </span>
            <h2 className="section-title">
              LOUD.
              <br />
              MESSY.
              <br />
              <span className="accent">REAL.</span>
            </h2>
            <p className="about-text">
              Foody Junction is loud, messy, and unapologetically delicious.
              Born in the streets of Delhi, built for the bold. We cook with
              zero pretension and maximum flavour. No tablecloths. No fancy
              plating. Just real ingredients, real heat, real people.
            </p>
            <a
              href="#contact"
              className="btn"
              style={{
                background: "var(--yellow)",
                color: "var(--black)",
                borderColor: "var(--yellow)",
                boxShadow: "5px 5px 0 var(--red)",
              }}
              //   onmouseenter="this.style.transform='translate(-3px,-3px)';this.style.boxShadow='8px 8px 0 var(--red)'"
              //   onmouseleave="this.style.transform='';this.style.boxShadow='5px 5px 0 var(--red)'"
            >
              FIND US →
            </a>
            <div className="about-stats">
              <div className="stat-box">
                <div className="stat-num">8+</div>
                <div className="stat-label">Years Cooking</div>
              </div>
              <div className="stat-box">
                <div className="stat-num">42K</div>
                <div className="stat-label">Happy Stomachs</div>
              </div>
              <div className="stat-box">
                <div className="stat-num">3</div>
                <div className="stat-label">Locations</div>
              </div>
            </div>
          </div>
          <div
            className="about-right reveal"
            style={{ transitionDelay: "0.15s" }}
          >
            <div className="about-img-shadow"></div>
            <div className="about-img-main">🍜</div>
            <div className="about-sticker">EST. 2016</div>
          </div>
        </div>
      </section>

      {/* <!-- TESTIMONIALS --> */}
      <section id="testimonials">
        <div className="testi-header">
          <span className="section-label">REAL TALK</span>
          <h2 className="section-title">
            THEY SAID IT,
            <br />
            NOT US.
          </h2>
        </div>
        <div className="testi-grid">
          <div className="testi-card reveal">
            <div className="testi-quote-mark">"</div>
            <div className="testi-stars">★★★★★</div>
            <p className="testi-text">
              The Neon Burger Stack is criminally good. I've ordered it four
              times this week. My wallet hates me. My taste buds love this place
              with unholy devotion.
            </p>
            <div className="testi-author-row">
              <div className="testi-avatar">😤</div>
              <div>
                <div className="testi-name">Rajan Mehta</div>
                <div className="testi-meta">Loyal Customer · Delhi</div>
              </div>
            </div>
          </div>
          <div
            className="testi-card reveal"
            style={{ transitionDelay: "0.1s" }}
          >
            <div className="testi-quote-mark">"</div>
            <div className="testi-stars">★★★★★</div>
            <p className="testi-text">
              Walked in for one Chaos Fries. Left having eaten everything on the
              menu. No regrets. Absolutely zero. Send help. Also more fries
              please.
            </p>
            <div className="testi-author-row">
              <div
                className="testi-avatar"
                style={{ background: "var(--neon)" }}
              >
                🤤
              </div>
              <div>
                <div className="testi-name">Priya Sharma</div>
                <div className="testi-meta">Food Blogger · Noida</div>
              </div>
            </div>
          </div>
          <div
            className="testi-card reveal"
            style={{ transitionDelay: "0.2s" }}
          >
            <div className="testi-quote-mark">"</div>
            <div className="testi-stars">★★★★☆</div>
            <p className="testi-text">
              Tried the Explosive Paneer Wrap after a friend's dare. It
              absolutely destroyed me. In the best possible way. I'm back every
              Saturday now. It's a sickness.
            </p>
            <div className="testi-author-row">
              <div
                className="testi-avatar"
                style={{ background: "var(--pink)" }}
              >
                🔥
              </div>
              <div>
                <div className="testi-name">Arjun Das</div>
                <div className="testi-meta">Spice Enthusiast · Gurgaon</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- CONTACT --> */}
      <section id="contact">
        <span className="section-label">GET IN TOUCH</span>
        <h2 className="section-title">
          COME FIND US.
          <br />
          WE'RE LOUD.
        </h2>
        <div className="contact-grid">
          <div>
            <div className="contact-info-box">
              <div className="info-header">📍 FOODY JUNCTION HQ</div>
              <div className="info-rows">
                <div className="info-row">
                  <div className="info-icon">🗺</div>
                  <div>
                    <span className="info-label">Address</span>
                    <div className="info-val">
                      42-B, Hauz Khas Village
                      <br />
                      South Delhi, 110016
                    </div>
                  </div>
                </div>
                <div className="info-row">
                  <div className="info-icon">📞</div>
                  <div>
                    <span className="info-label">Phone</span>
                    <div className="info-val">
                      +91 99110 84200
                      <br />
                      +91 98188 00420
                    </div>
                  </div>
                </div>
                <div className="info-row">
                  <div className="info-icon">✉️</div>
                  <div>
                    <span className="info-label">Email</span>
                    <div className="info-val">
                      eat@foodyjunction.in
                      <br />
                      orders@foodyjunction.in
                    </div>
                  </div>
                </div>
                <div className="info-row">
                  <div className="info-icon">🕐</div>
                  <div>
                    <span className="info-label">Hours</span>
                    <div className="info-val">
                      Mon–Sun: 12:00 PM – 11:00 PM
                      <br />
                      Kitchen closes at 10:30 PM
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="contact-form">
            <h3
              style={{
                fontFamily: "'Bebas Neue','sans-serif'",
                fontSize: "2rem",
                letterSpacing: "1px",
              }}
            >
              SEND US A<br />
              SHOUT.
            </h3>
            <div className="form-row">
              <div className="form-group">
                <label>Your Name</label>
                <input type="text" placeholder="e.g. Rajan Mehta" />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input type="tel" placeholder="+91 XXXXX XXXXX" />
              </div>
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="you@example.com" />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea placeholder="Tell us your order, complaint, life story..."></textarea>
            </div>
            <button
              className="btn btn-primary"
              style={{ width: "fit-content" }}
              //   onClick={handleFormSubmit}
            >
              SEND IT →
            </button>
          </div>
        </div>
      </section>

      {/* <!-- FOOTER --> */}
      <footer>
        <div className="footer-grid">
          <div>
            <span className="footer-logo">
              FOODY<span>.</span>JUNCTION
            </span>
            <p className="footer-tagline">
              Born on the streets of Delhi.
              <br />
              Built for those who eat loud and live raw.
              <br />
              No apologies. Just flavour.
            </p>
            <div className="social-row">
              <a href="#" className="social-btn" title="Instagram">
                IG
              </a>
              <a href="#" className="social-btn" title="X/Twitter">
                𝕏
              </a>
              <a href="#" className="social-btn" title="Facebook">
                FB
              </a>
              <a href="#" className="social-btn" title="YouTube">
                YT
              </a>
              <a
                href="#"
                className="social-btn"
                title="Zomato"
                style={{ fontSize: "0.6rem", fontWeight: 700 }}
              >
                ZMT
              </a>
            </div>
          </div>
          <div>
            <div className="footer-col-title">QUICK LINKS</div>
            <ul className="footer-links">
              <li>
                <a href="#hero">Home</a>
              </li>
              <li>
                <a href="#menu">Menu</a>
              </li>
              <li>
                <a href="#about">About Us</a>
              </li>
              <li>
                <a href="#testimonials">Reviews</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">LOCATIONS</div>
            <ul className="footer-links">
              <li>
                <a href="#">Hauz Khas Village</a>
              </li>
              <li>
                <a href="#">Lajpat Nagar</a>
              </li>
              <li>
                <a href="#">Connaught Place</a>
              </li>
            </ul>
            <div className="footer-col-title" style={{ marginTop: "1.5rem" }}>
              ORDER ON
            </div>
            <ul className="footer-links">
              <li>
                <a href="#">Zomato</a>
              </li>
              <li>
                <a href="#">Swiggy</a>
              </li>
              <li>
                <a href="#">Direct Delivery</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">
            © 2024 FOODY JUNCTION. ALL RIGHTS RESERVED.
          </div>
          <div className="footer-love">MADE WITH 🔥 IN DELHI, INDIA</div>
        </div>
      </footer>

      {/* <!-- ORDER MODAL --> */}
      {isOrderOpen && (
        <div className="modal-overlay" id="orderModal">
          <div className="modal-wrap">
            <div className="modal-shadow"></div>
            <div className="modal-box">
              <div className="modal-header">
                <span className="modal-title">PLACE YOUR ORDER</span>
                <button
                  className="modal-close"
                  onClick={closeModal("orderModal")}
                >
                  ✕
                </button>
              </div>
              <div className="modal-body">
                <div className="modal-dish-info" id="modalDishInfo">
                  <div className="modal-dish-emoji" id="modalEmoji">
                    🍔
                  </div>
                  <div>
                    <div className="modal-dish-name" id="modalDishName">
                      NEON BURGER STACK
                    </div>
                    <div className="modal-dish-price" id="modalDishPrice">
                      ₹349
                    </div>
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "0.65rem",
                      fontWeight: "700",
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      marginBottom: "0.5rem",
                    }}
                  >
                    QUANTITY
                  </div>
                  <div className="modal-qty-row">
                    <button className="qty-btn" onClick={() => changeQty(-1)}>
                      −
                    </button>
                    <div className="qty-num" id="qtyNum">
                      1
                    </div>
                    <button className="qty-btn" onClick={() => changeQty(1)}>
                      +
                    </button>
                  </div>
                </div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    opacity: 0.7,
                    border: "2px solid #ddd",
                    padding: "0.8rem",
                    background: "#f9f9f4",
                  }}
                >
                  💬 <strong>Note:</strong> This is a demo — orders are for
                  illustration only. Visit us at Hauz Khas or call{" "}
                  <strong>+91 99110 84200</strong> to place a real order!
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={confirmOrder()}>
                  ADD TO ORDER ✓
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={closeModal("orderModal")}
                >
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* <!-- SUCCESS MODAL --> */}
      {isSuccessOpen && (
        <div className="modal-overlay" id="successModal">
          <div className="modal-wrap" style={{ maxWidth: "420px" }}>
            <div
              className="modal-shadow"
              style={{ background: "var(--neon)" }}
            ></div>
            <div className="modal-box">
              <div
                className="modal-header"
                style={{
                  background: "var(--neon)",
                  borderColor: "var(--black)",
                }}
              >
                <span className="modal-title" style={{ color: "var(--black)" }}>
                  ORDER CONFIRMED!
                </span>
                <button
                  className="modal-close"
                  style={{ borderColor: "var(--black)", color: "var(--black)" }}
                  onClick={closeModal("successModal")}
                >
                  ✕
                </button>
              </div>
              <div
                className="modal-body"
                style={{ textAlign: "center", alignItems: "center" }}
              >
                <div style={{ fontSize: "4rem" }}>🎉</div>
                <div
                  style={{
                    fontFamily: "'Bebas Neue','sans-serif'",
                    fontSize: "2rem",
                    letterSpacing: "1px",
                  }}
                >
                  YOUR ORDER IS IN!
                </div>
                <p
                  style={{ fontSize: "0.8rem", opacity: 0.7, lineHeight: 1.6 }}
                >
                  We're firing up the kitchen. Estimated delivery:{" "}
                  <strong>25–35 mins</strong>. Stand by for something loud.
                </p>
                <button
                  className="btn btn-primary"
                  onClick={closeModal("successModal")}
                >
                  KEEP BROWSING →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
