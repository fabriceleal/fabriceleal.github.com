
module Jekyll
  class Linkedin < Liquid::Tag
    def render(context)
      "Hi!"
    end
  end
end

Liquid::Template.register_tag('linkedin', Jekyll::Linkedin)
