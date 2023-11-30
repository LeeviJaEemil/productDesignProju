<template>
  <div id="FooterMain" class="w-full bg-[#FA7070] py-6">
    <div class="mx-auto px-4">
      <!-- Mobiili Footer -->
      <div class="md:hidden">
        <div class="mb-4 text-center">
          <div class="text-lg font-semibold text-[#282828] mb-2">About Us</div>
          <div class="text-[#282828] text-sm">Bla blaa blaa</div>
        </div>
        <div class="mb-4 text-center">
          <div class="text-lg font-semibold text-[#282828] mb-2">Follow Us</div>
          <div class="flex justify-center gap-2">
            <a href="https://www.instagram.com" target="_blank" class="mr-2">
              <Icon name="ri:instagram-fill" class="h-6 w-6" />
              Instagram
            </a>
            <a href="https://www.twitter.com" target="_blank" class="mr-2">
              <Icon name="ri:twitter-fill" class="h-6 w-6" />
              Twitter
            </a>
            <a href="https://www.facebook.com" target="_blank" class="mr-2">
              <Icon name="akar-icons:facebook-fill" class="h-6 w-6" />
              Facebook
            </a>
            <a href="https://www.youtube.com" target="_blank">
              <Icon name="akar-icons:youtube-fill" class="h-6 w-6" />
              Youtube
            </a>
          </div>
        </div>
        <div class="mb-4 text-center">
          <div class="text-lg font-semibold text-[#282828] mb-2">
            Contact Us
          </div>

          <div class="flex justify-center gap-2">
            <a target="_blank" class="mr-2">
              <Icon name="carbon:phone-filled" alt="Phone: " class="h-6 w-6" />
              0401234567
            </a>
            <a href="https://www.twitter.com" target="_blank" class="mr-2">
              <Icon name="dashicons:email" alt="Email: " class="h-6 w-6" />
              customer@service.com
            </a>
          </div>
        </div>
      </div>

      <!-- Kone Footer -->
      <div class="hidden md:flex flex-row justify-between w-full">
        <!-- <div class="basis-1/3 justify-center">
          <div class="text-lg font-semibold text-[#282828] mb-5">About Us</div>
          <a>Blaa blaa</a>
        </div> -->
        <div class="flex justify-center basis-1/3 border-r-2 border-black">
          <div class="text-center mr-3 ml-3">
            <div class="text-lg font-semibold text-[#282828] mb-5">
              Follow Us
            </div>
            <div class="flex flex-col items-center gap-2">
              <a class="flex items-center gap-2"
                >Blaa blaa blaa bla blaa blaa blaa bla blaa
              </a>
              <a class="flex items-center gap-2"
                >Blaa blaa blaa blaa blaa blaa blaa blaa blaa blaa
              </a>
            </div>
          </div>
        </div>

        <div class="flex justify-center basis-1/3 border-r-2 border-black">
          <div class="text-center">
            <div class="text-lg font-semibold text-[#282828] mb-5">
              Follow Us
            </div>
            <div class="flex flex-col items-start gap-2">
              <a href="https://www.instagram.com" target="_blank" class="mr-2">
                <Icon
                  name="entypo-social:instagram-with-circle"
                  class="h-6 w-6"
                />
                Instagram
              </a>
              <a href="https://www.twitter.com" target="_blank" class="mr-2">
                <Icon
                  name="entypo-social:twitter-with-circle"
                  class="h-6 w-6"
                />
                Twitter
              </a>
              <a href="https://www.facebook.com" target="_blank" class="mr-2">
                <Icon
                  name="entypo-social:facebook-with-circle"
                  class="h-6 w-6"
                />
                Facebook
              </a>
              <a href="https://www.youtube.com" target="_blank">
                <Icon
                  name="entypo-social:youtube-with-circle"
                  class="h-6 w-6"
                />
                Youtube
              </a>
            </div>
          </div>
        </div>

        <div class="flex justify-center basis-1/3">
          <div class="text-center">
            <div class="text-lg font-semibold text-[#282828] mb-5">
              Contact Us
            </div>
            <div class="flex flex-col items-start gap-2">
              <a class="mr-2">
                <Icon
                  name="carbon:phone-filled"
                  alt="Phone: "
                  class="h-6 w-6"
                />
                0401234567
              </a>
              <a target="_blank" class="mr-2">
                <Icon name="dashicons:email" alt="Email: " class="h-6 w-6" />
                customerservice@blööblöö.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
