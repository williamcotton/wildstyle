# frozen_string_literal: true

steve = User.create!(username: 'steve', name: 'Steve')

wacky_widget = Product.create!(title: 'Wacky Widget', description: 'A wonderfully wacky widget.')
tipsy_tool = Product.create!(title: 'Tipsy Tool', description: 'A totally tipsy tool.')
goofy_gadget = Product.create!(title: 'Goofy Gadget', description: 'A genuinely goofy gadget.')

Review.create(product: wacky_widget, user: steve, title: 'Wacky widget is kind of awesome!', body: 'I did not think I would dig it but I do!')
